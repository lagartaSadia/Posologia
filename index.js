import { create } from "venom-bot";
import fs from "fs";

const grettings =
  "Olá eu sou o Robô Posologia!\nPara iniciar escolha uma opção:\n\n1 - Ver meus medicamentos\n2 - Adicionar medicamento\n3 - Remover medicamento";
const regexAdd = /^2 - /g;
const regexRemove = /^3 - /g;

create({
  session: "session-name", //name of session
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Robô" || message.body === "robô") {
      client
        .sendText(message.from, grettings)
        .then(() => {
          console.log("Mensagem enviada com sucesso");
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === 1 || message.body === "1") {
      const medicamentos = procuraMedicamentos(
        message.from.replace("@c.us", "")
      );

      if (medicamentos === "") {
        medicamentos = "Você não possui medicamentos cadastrados";
      }

      client
        .sendText(message.from, medicamentos)
        .then(() => {
          console.log("Mensagem 1 enviada com sucesso");
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === 2 || message.body === "2") {
      client
        .sendText(
          message.from,
          "Para adicionar novo medicamento, digite:\n2 - Nome do medicamento - Quantos dias até acabar"
        )
        .then(() => {
          console.log("Mensagem 2 enviada com sucesso");
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body === 3 || message.body === "3") {
      client
        .sendText(
          message.from,
          "Para remover medicamento, digite:\n3 - Número do medicamento"
        )
        .then(() => {
          console.log("Mensagem 3 enviada com sucesso");
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
    } else if (message.body.match(regexAdd)) {
      const telefone = message.from.replace("@c.us", "");
      const array = message.body.split(" - ");
      const medicamento = array[1];
      let data = new Date();
      data.setDate(data.getDate() + Number(array[2]));

      try {
        addToJSON(telefone, medicamento, data);
      } catch (erro) {
        console.log(erro);
      }

      client.sendText(message.from, "Medicamento adicionado").catch((erro) => {
        console.error("Error when sending: ", erro);
      });
    } else if (message.body.match(regexRemove)) {
      const array = message.body.split(" - ");
      const id = Number(array[1]);
      const telefone = message.from.replace("@c.us", "");
      const removeu = removeMedicamento(Number(id), telefone);

      let mensagem = removeu
        ? "Medicamento removido"
        : "Não há medicamento com esse número";

      client.sendText(message.from, mensagem).catch((erro) => {
        console.error("Error when sending: ", erro);
      });
    }
  });
}

function addToJSON(telefone, medicamento, dia) {
  const jsonData = fs.readFileSync("posologia.json", "utf-8");
  const data = JSON.parse(jsonData);
  const arr = Array.from(data);
  const id = arr[arr.length - 1].id + 1;

  const obj = {
    id: id,
    telefone: telefone,
    nome: medicamento,
    dia: dia,
  };
  arr.push(obj);

  fs.writeFileSync("posologia.json", JSON.stringify(arr), "utf-8");
}

function procuraMedicamentos(telefone) {
  const jsonData = fs.readFileSync("posologia.json", "utf-8");
  const data = JSON.parse(jsonData);
  const arr = Array.from(data);

  let texto = "";
  arr.forEach((medicamento) => {
    if (medicamento.telefone === telefone) {
      const dia = medicamento.dia.substring(0, 10);
      const reverseDia = dia.split("-").reverse().join("-");

      texto += `${medicamento.id} - ${medicamento.nome} - ${reverseDia}\n`;
    }
  });

  if (texto == "") {
    texto = "Você não tem medicamento cadastrado";
  }

  return texto;
}

function removeMedicamento(id, telefone) {
  const jsonData = fs.readFileSync("posologia.json", "utf-8");
  const data = JSON.parse(jsonData);
  const arr = Array.from(data);

  let excluido = false;
  let index = 0;
  arr.forEach((medicamento) => {
    if (medicamento.id === id && medicamento.telefone == telefone) {
      arr.splice(index, 1);
      excluido = true;
    }
    index += 1;
  });

  fs.writeFileSync("posologia.json", JSON.stringify(arr), "utf-8");
  return excluido;
}
