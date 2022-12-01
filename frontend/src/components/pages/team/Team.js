import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import LoadingSkeleton from "../../common/LoadingSkeleton";
const URL_TEAM_API = "http://localhost:5000/api/team/";

const StyledTeamWrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  @keyframes comming {
    from {
      transform: translateX(-80%);
    }
    to {
      transform: translateX(0);
    }
  }

  .member-title {
    color: var(--primary-color);
  }
  .name-member {
    color: rgba(0, 0, 0, 0.8);
  }
  .member-item:hover {
    background-color: var(--primary-color);
  }
  .member-item:hover .member-contact {
    display: block;
  }
  .member-item:hover .member-info {
    /* background-color: var(--primary-color); */
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .member-item:hover .role-member,
  .member-item:hover .name-member {
    color: white;
  }
  .member-contact {
    transition: all 0.5s ease-in-out;
    animation: comming 0.5s ease-in-out;
  }
  .member-contact-item-wrapper {
    background-color: #111111;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    a {
      color: white;
    }
  }

  .member-contact-item-wrapper:hover {
    background-color: var(--primary-color);
  }

  @media screen and (max-width: 1023px) {
    .list-member-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
    .member-title {
      font-size: 40px;
    }
  }
  @media screen and (max-width: 767px) {
    .list-member-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

const TeamMember = ({ data }) => {
    
    return(<div
    className="member-item rounded-lg shadow-md transition-all"
  >
    <div className="w-full h-[450px] p-3 relative">
      <img
        className="w-full h-full object-cover rounded-lg"
        src={data.avatar}
        alt=""
      />
      <div className="member-contact absolute bottom-6 left-6 hidden">
        <ul>
          <li className="w-[40px] h-[40px] mb-3 rounded-full member-contact-item-wrapper">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </li>
          <li className="w-[40px] h-[40px] mb-3 rounded-full member-contact-item-wrapper">
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li className="w-[40px] h-[40px] mb-3 rounded-full member-contact-item-wrapper">
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="pl-3 py-4 text-center member-info transition-all">
      <h2 className="mb-2 text-xl name-member font-medium transition-all">
        {data.fullname}
      </h2>
      <p className="text-[14px] text-[#999999] uppercase role-member transition-all">
        {data.role}
      </p>
    </div>
  </div>);
};

const LoadingTeamMember = ()=>{
    return(<div
        className="member-item rounded-lg shadow-md transition-all"
      >
        <div className="w-full h-[450px] p-3 relative">
            <LoadingSkeleton width="100%" height="100%"/>
        </div>
        <div className="pl-3 py-4 text-center member-info transition-all mr-2">
          <h2 className="mb-2 text-xl h-[30px] name-member font-medium transition-all ">
            <LoadingSkeleton width="100%" height="100%"/>
          </h2>
          <p className="text-[14px] h-[10px] text-[#999999] uppercase role-member transition-all">
            <LoadingSkeleton width="100%" height="100%"/>
          </p>
        </div>
      </div>);
}

const Team = () => {
  const [listMember, setListMember] = useState([]);
  const [loading, setLoading] = useState(true);
  const getListMember = async () => {
    setLoading(true);
    const response = await axios.get(URL_TEAM_API);
    console.log(response.data);
    return response.data;
  };
  useEffect(() => {
    getListMember().then((listMember) => {
      setListMember(listMember);
      setLoading(false);
    });
  }, []);
  return (
    <StyledTeamWrapper>
      <h1 className="member-title text-7xl text-center mt-[40px] mb-[40px]">
        Thành viên phát triển dự án
      </h1>
      {loading && (
        <div className="list-member-wrapper grid grid-cols-3 gap-10 px-10 pb-10">
            <LoadingTeamMember/>
            <LoadingTeamMember/>
            <LoadingTeamMember/>
      </div>
      )}
      <div className="list-member-wrapper grid grid-cols-3 gap-10 px-10 pb-10">
        {!loading && listMember.length>0 && listMember.map((member) => {
            return <TeamMember key={member._id} data={member}/>
        })}
      </div>
    </StyledTeamWrapper>
  );
};

export default Team;
