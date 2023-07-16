import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";

import { RootState } from "@/store/store";
import {
  getUserData,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "@/store/usersSlice";
import styles from "./landingpage.module.scss";

function HomePage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(getUsersStart());
    axios
      .get("https://panorbit.in/api/users.json")
      .then((response) => {
        dispatch(getUsersSuccess(response?.data?.users));
      })
      .catch((error) => dispatch(getUsersFailure(error.message)));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={styles.homewrapper}>
      <img src="/bluecurve.svg" alt="" className={styles.bluesvg} />
      <img src="/greycurve.svg" alt="" className={styles.greysvg} />
      <div className={styles.usercard}>
        <div className={styles.title}>Select An Account</div>
        <div className={styles.userlist}>
          {data.map((item: any, index: any) => {
            return (
              <div key={index}>
                <Link
                  href="/profile"
                  onClick={() => dispatch(getUserData(item))}
                >
                  <div className={styles.singleuser}>
                    <img src={item.profilepicture || "/User.svg"} alt="" />
                    <div>{item?.name}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
