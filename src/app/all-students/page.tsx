"use client";

import {
  Group,
  Button,
  Text,
  Container,
  Card,
  Avatar,
  Box,
  LoadingOverlay,
  Table,
} from "@mantine/core";

import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import classes from "@/styles/Venue.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [allStudents, setAllStudents] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  //   useEffect(() => {
  //     if (id != undefined) {
  //       const fetch = async () => {
  //         const docRef = doc(db, "student", id);
  //         const docSnap = await getDoc(docRef);

  //         if (docSnap.exists()) {
  //         //   setAllStudent({ id: docSnap.id, ...docSnap.data() });
  //         } else {
  //           alert("info not found, please refresh the page");
  //         }
  //       };
  //       fetch();
  //     }
  //   }, [id]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "student")); // Fetch all students
      const querySnapshot = await getDocs(q);
      setLoading(false); // Set loading to false after fetching

      // Initialize an array to hold the student data
      let all = [];
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          all.push({ id: doc.id, ...studentData }); // Push the student data into the array
          console.log(all);
          setAllStudents(all);
        });
      } else {
        alert("No students found.");
      }
    };
    fetch();
  }, []);

  function capitalizeEachWord(str: string) {
    return str
      ?.split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Container size="md">
      {allStudents ? (
        <Box>
          <Text c="green" fz="xl" fw="bold" my="xl" ta="center" td="underline">
            List of all registered students
          </Text>
          <Table>
            <Table.Tr>
              <Table.Th>s/n</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Matric Number</Table.Th>
              <Table.Th>Department</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Program</Table.Th>
              <Table.Th>Email</Table.Th>
              {/* <Table.Th>Venue</Table.Th> */}
              <Table.Th></Table.Th>
            </Table.Tr>
            {allStudents?.map((detail: any, i: number) => (
              <Table.Tr
                style={{ cursor: "pointer" }}
                key={detail?.id}
                onClick={() => {
                  router.push(`/venue?id=${detail.id}`);
                }}
              >
                <Table.Td>{i + 1}</Table.Td>
                <Table.Td>{capitalizeEachWord(detail?.name)}</Table.Td>
                <Table.Td>{detail?.matric}</Table.Td>
                <Table.Td>
                  {detail?.department == null
                    ? "Computer Science"
                    : detail?.department}
                </Table.Td>
                <Table.Td>{detail?.level}</Table.Td>
                <Table.Td>{detail?.program}</Table.Td>
                <Table.Td>{detail?.email}</Table.Td>
                {/* <Table.Td>{detail?.venue}</Table.Td> */}
                <Table.Td>
                  <Button>More details</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table>
          <Box my="xl" style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => router.push("/")}>Home</Button>
          </Box>
        </Box>
      ) : (
        // allStudents.map((student: any) => (
        //   <Card
        //     withBorder
        //     padding="xl"
        //     radius="md"
        //     className={classes.card}
        //     key={student.id}
        //   >
        //     <Card.Section
        //       h={140}
        //       style={{
        //         backgroundImage:
        //           "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
        //       }}
        //     />
        //     <Avatar
        //       src={`https://api.dicebear.com/6.x/initials/svg?seed=${student.name}`}
        //       size={80}
        //       radius={80}
        //       mx="auto"
        //       mt={-30}
        //       className={classes.avatar}
        //     />
        //   </Card>
        // ))
        <LoadingOverlay visible={true} />
      )}
    </Container>
  );
}
