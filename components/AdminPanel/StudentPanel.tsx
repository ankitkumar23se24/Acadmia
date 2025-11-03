import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import { StudentData } from '@/types/StudentData';

const StudentPanel = () => {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.get<StudentData[]>(`/api/admin/student`);
      const sortedData = res.data.sort((a, b) =>
        a.registrationNo.localeCompare(b.registrationNo, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
      setStudentData(sortedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const deleteStudent = async (id: string) => {
  //   const confirmation = confirm("Do you really want to delete?");
  //   if (confirmation) {
  //     try {
  //       await axios.delete(`/api/admin/student?id=${id}`);
  //       setStudentData((prevData) => prevData.filter((data) => data._id !== id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <>
      {/* Register Student Button */}
      <h1 className='text-center font-bold text-3xl pb-6 text-red-600'>Student Details</h1>
      {loading ? <Loading /> :
        <div className="w-full">
          {studentData.length === 0 && (
            <div className="text-center text-gray-500">No Data to show</div>
          )}
          {studentData.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-indigo-800 text-white">
                <tr>
                  <th className="py-2">S No</th>
                  <th className="py-2">Registration Id</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Father Name</th>
                  <th className="py-2">DOB</th>
                  {/* <th className="py-2">Action</th> */}
                </tr>
              </thead>
              <tbody className="bg-indigo-50">
                {studentData.map((st, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center border border-white">
                      <p>{index + 1}</p>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <p>{st.registrationNo}</p>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <p>{st.studentName}</p>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <p>{st.fatherName}</p>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <p>{format(new Date(st.dateOfBirth), "yyyy-MM-dd")}</p>
                    </td>
                    {/* <td className="py-2 text-center border border-white">
                      <div className="flex items-center justify-center">
                        <MdDelete
                          onClick={() => deleteStudent(st._id)}
                          className="cursor-pointer text-red-600 hover:text-red-800 text-2xl"
                        />
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      }
    </>
  );
};

export default StudentPanel;