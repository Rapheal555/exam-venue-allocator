"use client";

import { Box, Title } from "@mantine/core";

export default function Header() {
  return (
    <Box my="lg">
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
        Faculty of Science
      </Title>
    </Box>
  );
}
