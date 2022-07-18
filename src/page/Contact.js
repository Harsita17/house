import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import "../style/contact.css"
import contact from '../images/contact.svg'

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const getLandLord = async () => {
      if (params.landlordId) {
        console.log(params.landlordId.slice(0, -1));
        const docRef = doc(db, "users", params.landlordId.slice(0, -1));
        const docSnap = await getDoc(docRef);

        console.log("--------", auth.currentUser?.uid);

        if (docSnap.exists()) {
          console.log("doc existssss");

          setLandlord(docSnap.data());
        } else {
          toast.error("Unable to fetch data");
        }
      }
    };
    getLandLord();
    //eslint-disable-next-line
  }, [params.landlordId, auth.currentUser?.uid]);
  return (
    <Layout> 
      <div className="contactUs   ">
        <div className="contactimage">
          <img src={contact} alt="not working" style={{height:"320px",marginTop:"100px"}}/>
        </div> 
      
        
        <div>
          {landlord !== "" && (
            <main className="contactCont">
              <h3>Hey!!! {landlord?.name} will text you back</h3>

              <div className="contactform form-floating">
                <textarea 
                  className=" w-75"
                  placeholder="Your Message"
                  value={message}
                  id="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
               
              </div>
              <a
                href={`mailto:${landlord.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
              >
                <button className="send ">Send Message</button>
              </a>
            </main>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
