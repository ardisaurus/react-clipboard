import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import {
  MantineProvider,
  Switch,
  UnstyledButton,
  Avatar,
  Text,
  Grid,
  Card,
  ActionIcon,
  Badge,
  Group,
  Modal,
  Input,
  Button,
  Tooltip,
} from "@mantine/core";
import { IconCopy, IconTrash, IconPlus, IconX } from "@tabler/icons-react";
import { useLocalStorage } from "./useStorage";
import uuid from "react-uuid";
import "./App.css";

function App() {
  const [newItemName, setNewItemName] = useState("");
  const [newItemValue, setNewItemValue] = useState("");
  const [clipboard, setClipboard] = useLocalStorage("clipboard", []);
  const [scheme, setScheme] = useLocalStorage("scheme", "light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    const nextScheme = scheme === "dark" ? "light" : "dark";
    setScheme(nextScheme);
  };

  const addItem = () => {
    const items = [
      ...clipboard,
      { id: uuid(), name: newItemName, value: newItemValue },
    ];
    setClipboard(items);
    resetForm();
  };

  const removeItem = ({ e, id }) => {
    e.stopPropagation();
    const items = clipboard.filter((item) => item.id !== id);
    setClipboard(items);
  };

  const resetForm = () => {
    setNewItemValue("");
    setNewItemName("");
  };

  const notify = () => toast.info("Item copied");

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <MantineProvider
        theme={{ colorScheme: scheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Group position="apart" p="xs">
          <Text align="center" weight={500} size="xl">
            My Clipboard
          </Text>
          <Switch
            checked={scheme === "dark"}
            onChange={handleToggle}
            label="Dark mode"
          />
        </Group>
        <Modal
          opened={isModalOpen}
          onClose={() => {
            resetForm();
            setIsModalOpen(false);
          }}
          title="New Item"
          centered
        >
          <div>
            <label>Name </label>
            <Input
              value={newItemName}
              placeholder="Insert item name"
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1em" }}>
            <label>Value </label>
            <Input
              value={newItemValue}
              placeholder="Insert item value"
              onChange={(e) => setNewItemValue(e.target.value)}
            />
          </div>

          <Group position="right" mt="md" mb="xs">
            <Button
              onClick={() => {
                addItem();
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Save
            </Button>
          </Group>
        </Modal>

        <Grid
          breakpoints={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          justify="center"
        >
          {clipboard.map((item) => (
            <div
              style={{
                minWidth: "300px",
                padding: ".5em",
                cursor: "pointer",
              }}
              key={item.id}
              onClick={() => notify()}
            >
              <CopyToClipboard text={item.value}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section></Card.Section>
                  <Group mt="md" mb="xs">
                    <Text weight={500}>{item.value}</Text>
                  </Group>
                  <Group position="apart">
                    <Badge color="pink">{item.name}</Badge>
                    <Group position="right">
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={(e) => removeItem({ e, id: item.id })}
                      >
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Card>
              </CopyToClipboard>
            </div>
          ))}

          {clipboard.length > 0 ? (
            <Tooltip label="Clear clipboard">
              <UnstyledButton
                onClick={() => {
                  setClipboard([]);
                }}
                mr="sm"
              >
                <Avatar size={100} color="red">
                  <IconX />
                </Avatar>
              </UnstyledButton>
            </Tooltip>
          ) : null}

          <Tooltip label="Add new item">
            <UnstyledButton
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Avatar size={100} color="green">
                <IconPlus />
              </Avatar>
            </UnstyledButton>
          </Tooltip>
        </Grid>
      </MantineProvider>
    </div>
  );
}

export default App;
