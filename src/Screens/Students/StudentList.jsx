/** @format */

// /** @format */

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import styles from './Student.module.css';
// import Home from '../Home/Home';
// import Tables from '../../Components/Tables/Tables';
// import { database } from '../../Configuration/Firebase';
// import { Container, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import TablePagination from '@mui/material/TablePagination';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const studentsCollection = collection(database, 'students');
//       const studentSnapshot = await getDocs(studentsCollection);
//       const studentList = studentSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setStudents(studentList);
//     };

//     fetchStudents();
//   }, []);

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className={styles.StudentRegistrationMain}>
//       <div className={styles.homeContainer}>
//         <Home />
//       </div>
//       <div className={styles.registrationContainer2}>
//         <div className={styles.ExamCard}>
//           <Container>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '20px',
//               }}
//             >
//               <Typography variant="h4" align="center" gutterBottom>
//                 Student List
//               </Typography>
//               <Button
//                 variant="contained"
//                 sx={{ color: 'blacks', backgroundColor: '#4CAF50' }}
//                 onClick={() => navigate('/Student/StudentRegistration')}
//               >
//                 Add
//               </Button>
//               <Button
//                 variant="contained"
//                 sx={{ color: 'blacks', backgroundColor: '#4CAF50' }}
//               >
//                 Delete All
//               </Button>
//             </div>
//             <Tables
//               rows={students.slice(
//                 page * rowsPerPage,
//                 page * rowsPerPage + rowsPerPage
//               )}
//             />
//             <TablePagination
//               rowsPerPageOptions={[5, 10]}
//               component="div"
//               count={students.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentList;
/** @format */

import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import styles from './Student.module.css';
import Home from '../Home/Home';
import Tables from '../../Components/Tables/Tables';
import { database } from '../../Configuration/Firebase';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(database, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete all items
  const handleDeleteAll = async () => {
    try {
      const batch = writeBatch(database);
      const studentsCollection = collection(database, 'students');
      const studentSnapshot = await getDocs(studentsCollection);

      studentSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      setStudents([]); // Clear the state after deletion
    } catch (error) {
      console.error('Error deleting all students: ', error);
    }
  };

  return (
    <div className={styles.StudentRegistrationMain}>
      <div className={styles.homeContainer}>
        <Home />
      </div>
      <div className={styles.registrationContainer2}>
        <div className={styles.ExamCard}>
          <Container>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Student List
              </Typography>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: '#4CAF50',
                    marginRight: '10px',
                  }}
                  onClick={() => navigate('/Student/StudentRegistration')}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: 'white', backgroundColor: '#C62828' }} // Red color for delete
                  onClick={handleDeleteAll}
                >
                  Delete All
                </Button>
              </div>
            </div>
            <Tables
              rows={students.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
