"use client";
import {
  TextInput,
  SimpleGrid,
  Group,
  Title,
  Button,
  Select,
  Text,
  Container,
  LoadingOverlay,
} from "@mantine/core";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [level, setLevel] = useState<string | null>("");
  const [program, setProgram] = useState<string | null>("");
  const [name, setName] = useState("");
  const [matric, setMatric] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>();

  const router = useRouter();

  //read items from database

  const addItem = async () => {
    let venue = "";
    switch (level) {
      case "ND1":
        venue = "1000 Capacity";
        break;
      case "ND2":
        venue = "350 Capacity";
        break;
      case "ND3":
        venue = "Computer Lab";
        break;
      case "HND1":
        venue = "NLT";
        break;
      case "HND2":
        venue = "250 Capacity";
        break;
      default:
        venue = "Not Specified";
        break;
    }
    if (
      name != "" &&
      email != "" &&
      matric != "" &&
      level != "" &&
      program != "" &&
      venue != ""
    ) {
      try {
        const docRef = await addDoc(collection(db, "student"), {
          name: name,
          matric: matric,
          email: email,
          program: program,
          level: level,
          venue: venue,
        });
        router.push(`/venue?id=${docRef.id}`);
        setLoading(false);
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        setLoading(false);
        alert("Ther was an error, please try again");
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please fill all the feilds");
    }
  };

  const fetch = async () => {
    setLoading(true);

    try {
      const q = query(collection(db, "student"), where("matric", "==", matric));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // router.push(`/venue?id=${doc.id}`);
        setLoading(false);
        querySnapshot.forEach((doc) => {
          alert(
            "Your exam venue is already allocated to you : " + doc.data().venue
          );
          router.push(`/venue?id=${doc.id}`);
        });
      } else {
        addItem();
      }
    } catch (err) {
      console.log("err" + err);
      setLoading(false);
    }

    // const studentsRef = collection(db, "student");
    // // let studentInfo: any;

    // const q = query(studentsRef, where("matric", "==", matric));
    // const unsubscribe = onSnapshot(q, (QuerySnapshot: any) => {
    //   console.log(QuerySnapshot[0].id);
    //   QuerySnapshot.forEach((doc: any) => {
    //     setStudentInfo({ data: doc.data(), id: doc.id });
    //     // console.log(doc);

    //     if (studentInfo) {
    //       alert("exam venue already allocated " + studentInfo.data.venue);
    //       // router.push(`/venue?id=${doc.id}`);
    //       setLoading(false);
    //     } else {
    //       // addItem();
    //       alert("no no no");
    //     }
    //   });
    //   // return () =>
    // });
    // console.log(studentInfo);
    // switch (studentInfo) {
    //   case undefined:
    //     addItem();

    //     break;

    //   default:
    //     alert("exam venue already allocated " + studentInfo.data.venue);
    //     router.push(`/venue?id=${studentInfo.id}`);
    //     setLoading(false);
    //     break;
    // }
  };

  return (
    <Container size="lg">
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
      >
        The Polytechnic Ibadan
      </Title>
      <Title
        order={2}
        size="h2"
        mt="xs"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        ta="center"
      >
        Computer Science Department
      </Title>

      <Text mt="xl" ta="center">
        Please fill the form below to get your exam venue
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          variant="filled"
        />
        <TextInput
          label="Matric Number"
          placeholder="Your Matric Number"
          value={matric}
          onChange={(e) => setMatric(e.currentTarget.value)}
          variant="filled"
        />
      </SimpleGrid>
      <TextInput
        label="Email Address"
        placeholder="Your email"
        mt="md"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        variant="filled"
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <Select
          label="Program"
          placeholder="Pick program"
          data={["Full-Time", "DPP", "Part-Time"]}
          value={program}
          onChange={setProgram}
        />
        <Select
          label="Level"
          placeholder="Pick level"
          data={["ND1", "ND2", "ND3", "HND1", "HND2"]}
          value={level}
          onChange={setLevel}
        />
      </SimpleGrid>
      <LoadingOverlay visible={loading} />
      <Group justify="center" mt="xl">
        <Button onClick={() => fetch()} size="md">
          Submit
        </Button>
      </Group>
    </Container>
  );
}
