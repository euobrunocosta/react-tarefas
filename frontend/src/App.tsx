import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  Button,
  Confirm,
  SemanticCOLORS,
  Form,
  Input,
  Container as ContainerSUI,
  Menu,
  Icon,
  Dropdown,
} from 'semantic-ui-react';
import { Container, Texto } from './styles';

const uuid = require('react-uuid');

const App = () => {
  type TLista = {
    _id: string;
    texto: string;
    feito: boolean;
  };

  const api =
    window.location.protocol + '//' + window.location.hostname + ':4000/';

  const [lista, setLista] = useState<TLista[]>([]);
  const [showConfirmItem, setShowConfirmItem] = useState<boolean>(false);
  const [showConfirmItens, setShowConfirmItens] = useState<boolean>(false);
  const [itemSelecionado, setItemSelecionado] = useState<string>('');
  const [formTexto, setFormTexto] = useState<string>('');

  useEffect(() => {
    carregaTarefas();
  }, []);

  type TItemInfo = {
    icon: 'square outline' | 'check square outline';
    color?: SemanticCOLORS;
  };

  const itemInfo = (feito: boolean): TItemInfo => {
    if (feito) {
      return { icon: 'check square outline', color: 'green' };
    }
    return { icon: 'square outline' };
  };

  const toggleCheck = (id: string) => {
    const novaLista = [...lista];
    novaLista.forEach((item) => {
      if (item._id === id) item.feito = !item.feito;
      axios.put(`${api}tarefa/marca/${id}`, { feito: item.feito });
    });
    setLista(novaLista);
  };

  const removeItem = () => {
    setShowConfirmItem(false);
    const novaLista = [...lista];
    novaLista.splice(
      novaLista.findIndex((item) => item._id === itemSelecionado),
      1
    );
    setLista(novaLista);
    axios.delete(`${api}tarefa/remove/${itemSelecionado}`);
  };

  const carregaTarefas = async () => {
    const response = await axios.get(api);
    setLista(response.data);
  };

  const adicionaItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formTexto === '') return;

    const novaTarefa: TLista = {
      _id: uuid(),
      texto: formTexto,
      feito: false,
    };

    const novaLista = [...lista];
    novaLista.push(novaTarefa);
    setLista(novaLista);

    setFormTexto('');

    axios.post(`${api}tarefa/adiciona`, novaTarefa);
  };

  const marcarComo = (feito: boolean) => {
    const novaLista = [...lista];
    novaLista.forEach((item) => {
      item.feito = feito;
    });
    setLista(novaLista);
    axios.put(`${api}tarefas/marca`, { feito });
  };

  const removeTodos = () => {
    setLista([]);
    setShowConfirmItens(false);
    axios.delete(`${api}tarefas/remove`);
  };

  return (
    <>
      <Menu color="blue" inverted>
        <ContainerSUI>
          <Menu.Item header>
            <Icon name="check square outline" /> Lista de Tarefas
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown trigger={<>Marcar todos...</>}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="check square outline"
                    text="...como feitos"
                    onClick={() => marcarComo(true)}
                  />
                  <Dropdown.Item
                    icon="square outline"
                    text="...como não feitos"
                    onClick={() => marcarComo(false)}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Menu.Item as="a" onClick={() => setShowConfirmItens(true)}>
              <Icon name="trash alternate outline" />
              Limpar Lista
            </Menu.Item>
          </Menu.Menu>
        </ContainerSUI>
      </Menu>
      <Container>
        <Form onSubmit={adicionaItem}>
          <Form.Group unstackable>
            <Form.Field
              control={Input}
              placeholder="Nova tarefa"
              width={14}
              value={formTexto}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormTexto(e.target.value)
              }
            />
            <Form.Field
              control={Button}
              type="submit"
              color="blue"
              content="Adicionar"
              width={2}
            />
          </Form.Group>
        </Form>
        <List divided verticalAlign="middle">
          {lista.map((item) => (
            <List.Item key={item._id}>
              <List.Content floated="right">
                <Button
                  circular
                  icon="trash alternate outline"
                  color="red"
                  onClick={() => {
                    setItemSelecionado(item._id);
                    setShowConfirmItem(true);
                  }}
                />
              </List.Content>
              <List.Content floated="left">
                <Button
                  circular
                  {...itemInfo(item.feito)}
                  onClick={() => toggleCheck(item._id)}
                />
              </List.Content>
              <Texto feito={item.feito}>{item.texto}</Texto>
            </List.Item>
          ))}
        </List>
        <Confirm
          open={showConfirmItem}
          cancelButton="Cancelar"
          confirmButton="Ok"
          onCancel={() => setShowConfirmItem(false)}
          onConfirm={removeItem}
          content="Tem certeza que deseja remover esse item?"
        />
        <Confirm
          open={showConfirmItens}
          cancelButton="Cancelar"
          confirmButton="Ok"
          onCancel={() => setShowConfirmItens(false)}
          onConfirm={removeTodos}
          content="Tem certeza que deseja remover todos os itens?"
        />
      </Container>
    </>
  );
};

export default App;
