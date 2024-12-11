import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import "./Repas.css";
import "../SecreSanta/SecretSanta.css";

import supabase from "../supabase";

const Repas = () => {
  const [contributions, setContributions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Charger les contributions depuis Supabase
  const fetchContributions = async () => {
    const { data, error } = await supabase()
      .from("repas-ahead")
      .select("*")
      .order("id", { ascending: true });
    setContributions(data);
    if (error) {
      console.error("Erreur lors du chargement des contributions :", error);
    } else {
      setContributions(data);
    }
  };

  // Ajouter une contribution
  const addContribution = async () => {
    if (name && description) {
      const { data, error } = await supabase()
        .from("repas-ahead")
        .insert([{ name, description }])
        .select();

      if (error) {
        console.error("Erreur lors de l'ajout :", error);
      } else {
        setContributions([...contributions, ...data]);
        setName("");
        setDescription("");
      }
    }
  };

  // Supprimer une contribution
  const deleteContribution = async (id) => {
    const { error } = await supabase()
      .from("repas-ahead")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression :", error);
    } else {
      setContributions(
        contributions.filter((contribution) => contribution.id !== id)
      );
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div
      style={{
        marginTop: "10%",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Oberje Españolle </h1>

      <div style={{ margin: "10px", display: "flex", alignItems: "center" }}>
        <div class="InputContainer">
          <input
            type="text"
            className="input"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="InputContainer">
          <input
            type="text"
            className="input"
            placeholder="Ce que vous apportez"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="addContribution" onClick={addContribution}>
          Ajouter
        </button>
      </div>

      <h2>Ki apporte koi</h2>
      <ul>
        {contributions.map((contribution) => (
          <li key={contribution.id}>
            <strong>{contribution.name}</strong> :{" "}
            <em>{contribution.description}</em>
            <button
              className="delete"
              onClick={() => {
                deleteContribution(contribution.id);
              }}
            >
              <RiDeleteBinLine style={{ fontSize: "20px" }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Repas;
