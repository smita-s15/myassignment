import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import Sidenav from "@/components/sidenav";
import styles from "./common.module.scss";
import Link from "next/link";

function CommonSection({ isProfile = false, pagetitle = "" }: any) {
  const [showuser, setShowUsers] = useState<boolean>(false);
  const [dropdowm, setDropdown] = useState<boolean>(false);

  const userState = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.users);

  const defaultLatitude = 0;
  const defaultLongitude = 0;

  useEffect(() => {
    const iframeData = document.getElementById("iframeId") as HTMLIFrameElement;
    if (iframeData && user) {
      const latitude = user?.address?.geo?.lat;
      const longitude = user?.address?.geo?.lng;

      const mapSrc =
        latitude && longitude
          ? `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`
          : `https://maps.google.com/maps?q=${defaultLatitude},${defaultLongitude}&hl=es;&output=embed`;

      iframeData.src = mapSrc;
    }
  }, [user]);

  return (
    <div className={styles.coomon_wrapper}>
      {dropdowm && (
        <div className={styles.dropdown}>
          <div className={styles.users}>
            <img src={user?.profilepicture || "/User.svg"} alt="" />
            <div className="font_3">{user?.name}</div>
            <div className="font_2">{user?.email}</div>
            <div className={styles.new_user}>
              <img src={user?.profilepicture || "/User.svg"} alt="" />
              <span>Clemetine Bosch</span>
            </div>
            <div className={`${styles.new_user} ${styles.border}`}>
              <img src={user?.profilepicture || "/User.svg"} alt="" />
              <span>Patrecia Lesbak</span>
            </div>
            <Link href="/">
              <button>Sign out</button>
            </Link>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setDropdown(false);
          setShowUsers(false);
        }}
      >
        <Sidenav />
      </div>
      <div className={styles.rightsection}>
        <div
          className={styles.chats_wrapper}
          onClick={() => {
            setDropdown(false);
          }}
        >
          <div
            className={styles.chatbox}
            onClick={() => setShowUsers(!showuser)}
          >
            <div className={styles.chat_title}>
              <div className={styles.chat_name}>
                <img src="/chat.svg" />
                Chats
              </div>
              <img
                src="/uparrow.svg"
                className={showuser ? styles.chevron : styles.icon}
              />
            </div>
            {showuser && (
              <div className={styles.bottomsection}>
                {userState.data.map((user, key) => (
                  <div className={styles.user_wrapper} key={key}>
                    <div>
                      <img src={user?.profilepicture || "/User.svg"} alt="" />
                    </div>
                    <div>{user?.name}</div>
                    <div
                      className={`item ${
                        key % 2 === 0 ? styles.online_user : styles.offline_user
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.title}>
          <div className="font_1">{pagetitle}</div>
          <div
            className={styles.name_img}
            onClick={() => setDropdown(!dropdowm)}
          >
            <img src={user?.profilepicture || "/User.svg"} alt="" />
            <span className={styles.leftname}>{user?.name}</span>
          </div>
        </div>
        {isProfile ? (
          <div className={styles.details} onClick={() => setDropdown(false)}>
            <div className={styles.leftsection}>
              <div className={styles.user_name_img}>
                <img src={user?.profilepicture || "/User.svg"} alt="" />
                <div className="font_1">{user?.name}</div>
              </div>
              <div className={styles.personal_details}>
                <div className={styles.key}>
                  <div className="font_2">Username :</div>
                  <div className="font_2">email :</div>
                  <div className="font_2">Phone :</div>
                </div>
                <div className={styles.info}>
                  <div className="font_1">{user?.name}</div>
                  <div className="font_1">{user?.email}</div>
                  <div className="font_1">{user?.phone}</div>
                </div>
              </div>
              <div className={styles.company_title}>Company</div>
              <div className={styles.personal_details}>
                <div className={styles.key}>
                  <div className="font_2">name :</div>
                  <div className="font_2">Catchphrase :</div>
                  <div className="font_2">bs :</div>
                </div>
                <div className={styles.info}>
                  <div className="font_1">{user?.company?.name}</div>
                  <div className="font_1">{user?.company?.catchPhrase}</div>
                  <div className="font_1">{user?.company?.bs}</div>
                </div>
              </div>
            </div>
            <div className={styles.rightdetails}>
              <div className="font_2">Address :</div>
              <div className={styles.personal_details}>
                <div className={styles.key}>
                  <div className="font_2">Street :</div>
                  <div className="font_2">Suite :</div>
                  <div className="font_2">City :</div>
                  <div className="font_2">Zipcode :</div>
                </div>
                <div className={styles.info}>
                  <div className="font_1">{user?.address?.city}</div>
                  <div className="font_1">{user?.address?.suite}</div>
                  <div className="font_1">{user?.address?.street} </div>
                  <div className="font_1">{user?.address?.zipcode} </div>
                </div>
              </div>
              <iframe
                id="iframeId"
                height="500px"
                width="100%"
                style={{ borderRadius: "25px", border: 0, marginTop: "10px" }}
              />
              <div className={styles.latitude}>
                <div> Lat : {user?.address?.geo?.lat}</div>
                <div> Long :{user?.address?.geo?.lng}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.coming_soon}>
            <h1>Coming Soon</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommonSection;
