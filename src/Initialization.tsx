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
        const ids = snapshot.docs.map((doc) => doc.id);
        console.log(ids);

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

  return <>{children}</>;
};

export default Initialization;
