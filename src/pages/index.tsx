import { Container, Flex, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";

import { NextPageWithLayout } from "./_app";
import { GetStaticProps } from "next";

type ResponseData = {
  translatedMessage: string;
  originalMessage: string;
};

const getMessage = async () => {
  const response = await axios.get<ResponseData>(
    "http://localhost:3000/api/getMessage"
  );

  console.log("response");

  return response.data;
};

const Home: NextPageWithLayout<ResponseData> = ({
  originalMessage,
  translatedMessage,
}) => {
  const { data, error } = useSWR("/api/getMessage", getMessage, {
    refreshInterval: 900000,
    fallbackData: {
      translatedMessage,
      originalMessage,
    },
  });

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <Container maxW="xl2" centerContent>
      <Flex mt={2}>
        <Text textAlign="center" fontSize="55px">
          Commit-Meme
        </Text>
      </Flex>

      <Flex justify="center" align="center" h="100vh" flexDir="column">
        {data ? (
          <VStack gridGap="10px">
            <Text textAlign="center" fontSize="40px" fontStyle="italic">
              "{data.originalMessage}"
            </Text>
            <Text textAlign="center" fontSize="40px" fontStyle="italic">
              "{data.translatedMessage}"
            </Text>
          </VStack>
        ) : (
          <Text textAlign="center" fontSize="40px" fontStyle="italic">
            Carregando...
          </Text>
        )}
      </Flex>
    </Container>
  );
};

Home.pageTitle = "Message";

export const getStaticProps: GetStaticProps<ResponseData> = async () => {
  const data = await getMessage();

  return {
    props: {
      originalMessage: data.originalMessage,
      translatedMessage: data.translatedMessage,
    },
  };
};

export default Home;
