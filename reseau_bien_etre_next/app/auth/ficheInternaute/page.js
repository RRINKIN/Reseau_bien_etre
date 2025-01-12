  'use client'
  import { useState, useEffect } from "react";
  import { getInternauteId } from "../../api/getInternauteId";
  import { patchInternauteId } from "../../api/patchInternauteId";
  import getPayloadData from "../../auth/getPayloadData";

  function FicheInternaute() {

    // get the id of the internaute
    const payloadData = getPayloadData();

    // get the information to complete the form
    useEffect(() => {
      getInternauteId(payloadData.id).then((response)=>{
        const internauteData = {
          "nom" : response.nom,
          "prenom" : response.prenom,
          "newsletter" : response.newsletter,
          "adresseNum" : response.adresseNum,
          "adresseRue" : response.adresseRue,
          "localite" : {"localite" : response.localite.localite},
          "codePostal" : {"codePostal" : response.codePostal.codePostal},
        };
        setInternauteState({...internauteStates, ...internauteData});
        if(response.images){
          setUrlImage('http://localhost:8000'+response.images.image);
        }
      });
      return() => {};
    },[]);

    const [internauteStates, setInternauteState] = useState(
      {
        "nom" : '',
        "prenom" : '',
        "newsletter" : '',
        "adresseNum" : '',
        "adresseRue" : '',
        "localite" : {"localite" : ''},
        "codePostal" : {"codePostal" :''},
      }
    );   

    // manage the form
    const handleChangeFicheInternaute = (e) => {
      switch (e.target.name) {
        case 'name':
          setInternauteState({...internauteStates,nom:e.target.value});
          break;
        case 'surname':
          setInternauteState({...internauteStates,prenom:e.target.value});
          break;
        case 'newsletter':
          setInternauteState({...internauteStates,newsletter:e.target.checked});
          break;
        case 'adresseNum':
          setInternauteState({...internauteStates,adresseNum:e.target.value});
        break;
        case 'adresseRue':
          setInternauteState({...internauteStates,adresseRue:e.target.value});
        break;
        case 'localite':
          setInternauteState({...internauteStates,localite:{"localite" : e.target.value}});
        break;
        case 'postalCode':
          setInternauteState({...internauteStates,codePostal:{"codePostal" :e.target.value}});
        break;
        default:
          break;
      }
    };

    const handleFicheInternaute = (e) => {
      e.preventDefault();
      const resPostCreateUser = patchInternauteId(payloadData.id, internauteStates);
      resPostCreateUser.then(
        (res) => {
          console.log(res);
        }
      )
    }

    // setup state of the image
    const [urlImage, setUrlImage] = useState('http://localhost:8000/images/avatar.webp');

    // manage image upload
    const uploadImage = (e) => {
      e.preventDefault();
      const input = document.querySelector('#image');
      const data = new FormData();
      data.append('file', input.files[0]);
      fetch(`http://localhost:8000/api/imageInternaute/${payloadData.id}`, {
        method: 'POST',
        body: data
      }).then((response) => {
        return response.json();
      }).then((response) => {
        setUrlImage('http://localhost:8000'+response.uri);
      });
    }

    return (
      <div className="flex justify-center items-center">
        <div className="p-7 m-7 md:ml-7 w-1/2">
          <img 
              src={urlImage} 
              width="900" 
              height="700" 
              alt={internauteStates.nom + internauteStates.prenom} 
              className="rounded-lg w-1/2 mb-5" 
          />
          <form>
            <label htmlFor="image"></label>
            <input type='file' id="image" name="image"/>
            <button className="bg-zinc-100 text-black px-3 rounded border-black border" onClick={(e)=>{uploadImage(e)}}>charger...</button>
          </form>
          <p>Nom: {internauteStates.nom}</p>
          <p>Prenom: {internauteStates.prenom}</p>
          <p>Adresse: {internauteStates.adresseRue}, {internauteStates.adresseNum} - {internauteStates.codePostal.codePostal} {internauteStates.localite.localite}</p>
          <p>Prestataires favoris: </p>
        </div>
        <div className="bg-zinc-300 h-auto rounded p-7 m-7 md:ml-7 w-1/2">
          <h2>Fiche internaute</h2>
          <form className="flex flex-col">
            <label htmlFor="name">Nom</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="name" value={internauteStates.nom ?? ''} name="name" className="rounded px-4 outline-none"/>
            <label htmlFor="surname">Prenom</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="surname" value={internauteStates.prenom ?? ''} name="surname" className="rounded px-4 outline-none"/>
            <label htmlFor="adresseNum">Numéro</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="adresseNum" value={internauteStates.adresseNum ?? ''} name="adresseNum" className="rounded px-4 outline-none"/>
            <label htmlFor="adresseRue">Rue</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="adresseRue" value={internauteStates.adresseRue ?? ''} name="adresseRue" className="rounded px-4 outline-none"/>
            <label htmlFor="localite">Localité</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="localite" value={internauteStates.localite.localite ?? ''} name="localite" className="rounded px-4 outline-none"/>
            <label htmlFor="postalCode">Code Postal</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="text" id="postalCode" value={internauteStates.codePostal.codePostal ?? ''} name="postalCode" className="rounded px-4 outline-none"/>  
            <label htmlFor="newsletter">Newsletter</label>
            <input onChange={(e)=>{handleChangeFicheInternaute(e)}} type="checkbox" id="newsletter" value={internauteStates.newsletter && internauteStates.newsletter=='true' ? 'true' : 'false'} name="newsletter" className="rounded px-4 outline-none"/>
            <button 
            type="submit"
            className="text-center h-7 mt-7 px-4 outline-none hover:bg-violet-400 bg-zinc-500 md:w-1/3 rounded text-white flex flex-row items-center"
            onClick={(e) => {
              handleFicheInternaute(e);
            }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white h-10 pr-5"
                viewBox="0 0 512 512">
                <path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/>
              </svg>
              Envoyer
            </button>
          </form>
        </div>
      </div>
    );
  }
  export default FicheInternaute;