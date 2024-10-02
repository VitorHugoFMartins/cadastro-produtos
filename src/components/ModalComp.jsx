import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Stack,
    Radio,
    Input,
    Box,
} from '@chakra-ui/react'

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [name, setName] = useState(dataEdit.name || "");
    const [descricao, setDescricao] = useState(dataEdit.descricao || "");
    const [valor, setValor] = useState(dataEdit.valor || "");
    const [disponivel, setDisponivel] = useState(dataEdit.disponivel || "sim");

    const handleSave = () => {
        if (!name) return;

        if (nameAlreadyExists()) {
            return alert("Produto já cadastrado");
        }
        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, descricao, valor, disponivel }
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, descricao, valor, disponivel }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);
        onClose();
    };

    const nameAlreadyExists = () => {
        if (dataEdit.name !== name && data?.lenght) {
            return data.find((item) => item.name === name);
        }
        return false;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Clientes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display='flex' flexDirection='column' gap={4}>
                        <Box>
                            <FormLabel>Nome</FormLabel>
                            <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel>Descrição</FormLabel>
                            <Input type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel>Valor</FormLabel>
                            <Input placeholder="R$" type='number' value={valor} onChange={(e) => setValor(e.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel>Disponível para venda</FormLabel>
                            <RadioGroup onChange={setDisponivel} value={disponivel}>
                                <Stack direction="row">
                                    <Radio value="sim">Disponível</Radio>
                                    <Radio value="não">Não disponível</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent='start'>
                    <Button colorScheme='green' mr={3} onClick={handleSave}>Salvar</Button>
                    <Button colorScheme='red' onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalComp;
