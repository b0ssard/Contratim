import React, { useEffect } from "react";
import { contractsData } from "./contractsData";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const Initialization = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    getDocs(collection(getFirestore(), "contracts"))
      .then((snapshot) => {
        console.log("Total contratos:", snapshot.size);
<<<<<<< HEAD
        const ids = snapshot.docs.map((doc) => doc.id);
        console.log(ids);

=======
        // const ids: string[] = [];
        // let ids: string[] = [];
        // snapshot.docs.forEach((doc) => {
        // console.log(doc.id, doc.data());
        // ids.push(doc.id);
        // ids = [...ids, doc.id]
        // });
        const ids = snapshot.docs.map((doc) => doc.id);
        console.log(ids);
        // const numeros = [1,2,3,4,5,6];
        // const total = numeros.reduce((resultado, item) => resultado + item, 0);
        // let total = 0;
        // numeros.forEach((v) => total += v);
>>>>>>> c84f1cb2122b5c9ebe4a88ca191cdee6e2e5d8ea
        (async () => {
          await contractsData.contracts.reduce(async (p, value) => {
            await p;
            if (!ids.includes(value.contractType)) {
              console.log(`${value.contractType} não está; adicionado...`);
              const contractRef = doc(
                getFirestore(),
                "contracts",
                value.contractType
              );
              await setDoc(contractRef, value);
            } else {
              console.log("pulando...");
            }
          }, Promise.resolve());
        })();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
<<<<<<< HEAD
=======
  // const [contractsAdded, setContractsAdded] = useState(false);

  // useEffect(() => {
  //   if (!contractsAdded) {
  //     addContractToFirestore(contractsData.contracts[0])
  //       .then(() => {
  //         setContractsAdded(true);
  //       })
  //       .catch((error) => {
  //         console.error("Erro ao adicionar contratos:", error);
  //       });
  //   }
  // }, [contractsAdded]);
>>>>>>> c84f1cb2122b5c9ebe4a88ca191cdee6e2e5d8ea

  return <>{children}</>;
};

export default Initialization;
