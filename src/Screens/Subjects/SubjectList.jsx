/** @format */

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { database } from '../../Configuration/Firebase';
// import Home from '../Home/Home';
// import SubjectTable from '../../Components/Tables/SubjectTable';
// import styles from './Subject.module.css';
// import { Button, Container, TablePagination, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const SubjectList = () => {
//   const navigate=useNavigate();
//     const [subjects, setSubjects] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchSubjects = async () => {
//             const subjectsCollection = collection(database, 'subjects');
//             const subjectSnapshot = await getDocs(subjectsCollection);
//             const subjectList = subjectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setSubjects(subjectList);
//         };

//         fetchSubjects();
//     }, []);

//     // Handle page change
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       setPage(0);
//   };

//     return (
//         <div className={styles.SubjectRegistrationMain}>
//             <div className={styles.homeContainer}>
//                 <Home />
//             </div>
//             <div className={styles.registrationContainer}>
//             <div className={styles.ExamCard}>
//                     <Container>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                             <Typography variant="h4" align="center" gutterBottom>
//                                 Subject List
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 sx={{ color: "white", backgroundColor: "#5A0007" }}
//                                 onClick={() => navigate('/Subjects/SubjectAdd')}
//                             >
//                                 Add
//                             </Button>
//                         </div>
//                         <SubjectTable rows={subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10]}
//                             component="div"
//                             count={subjects.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </Container>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SubjectList;
import React, { useEffect, useState } from 'react';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { database } from '../../Configuration/Firebase';
import Home from '../Home/Home';
import SubjectTable from '../../Components/Tables/SubjectTable';
import styles from './Subject.module.css';
import { Button, Container, TablePagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubjectList = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsCollection = collection(database, 'subjects');
      const subjectSnapshot = await getDocs(subjectsCollection);
      const subjectList = subjectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubjects(subjectList);
    };

    fetchSubjects();
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
      const subjectsCollection = collection(database, 'subjects');
      const subjectSnapshot = await getDocs(subjectsCollection);

      subjectSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      setSubjects([]); // Clear the state after deletion
    } catch (error) {
      console.error('Error deleting all subjects: ', error);
    }
  };

  return (
    <div className={styles.SubjectRegistrationMain}>
      <div className={styles.homeContainer}>
        <Home />
      </div>
      <div className={styles.registrationContainer}>
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
                Subject List
              </Typography>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: '#5A0007',
                    marginRight: '10px',
                  }}
                  onClick={() => navigate('/Subjects/SubjectAdd')}
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
            <SubjectTable
              rows={subjects.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={subjects.length}
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

export default SubjectList;
