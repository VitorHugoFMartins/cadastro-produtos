import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tab,
  useBreakpointValue,
} from "@chakra-ui/react"



import { useEffect, useState } from "react"
import ModalComp from "./components/ModalComp"


const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem('cad_cliente')
      ? JSON.parse(localStorage.getItem('cad_cliente')) : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (name) => {
    const newArray = data.filter((item) => item.name !== name);

    setData(newArray);

    localStorage.setItem('cad_cliente', JSON.stringify(newArray));
  };

  const formatCurrency = (value) => {
    return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1.$2").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <Flex h="100vh" align='center' justify='center' fontSize='20px' fontFamily='poppins'>
      <Box maxW={800} w='100%' h='100vh' py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Produto
        </Button>
        <Box overflow='auto' height='100%'>
          <Table mt='6'>
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>Nome</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>Descrição</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>Valor</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize='20px'>Disponivel</Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, descricao, valor, disponivel }, index) => (
                <Tr key={index} cursor='pointer' _hover={{ bg: 'gray.100' }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{descricao}</Td>
                  <Td maxW={isMobile ? 5 : 100}>R$ {formatCurrency(valor)}</Td>
                  <Td maxW={isMobile ? 5 : 100}>
                    {disponivel === "sim" ? "Sim" : "Não"}
                  </Td>
                  <Td p={0}>
                    <EditIcon fontSize={20} onClick={() => [
                      setDataEdit({ name, descricao, valor, disponivel, index }), onOpen()
                    ]} />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon fontSize={20}
                      onClick={() => handleRemove(name)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit} />
      )}
    </Flex>
  )
}

export default App
