import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../config/theme";
import TagsList from "./TagsList";
import { IconsList, IconItem } from "./IconsList";
import ShareProfile from "./ShareProfile";

const ProfileCard = ({ data, hideShareButton}) => {
  return (
    <Wrapper>
      <Header>
        <Name>
          {`${data.first_name} ${data.last_name}`}
        </Name>

        {!hideShareButton && 
          <ShareProfile profileId={data.id} />
        }
      </Header>

      <Title>{data.position_title}</Title>
      <Description>{data.description}</Description>

      {data.profiles_roles && 
        <TagsList roles={data.profiles_roles} />
      }
      
      <IconsList>
        <IconItem icon="location" content={data.location.city} />
        <IconItem
          icon="relocation"
          content={data.open_to_relocation ? "Open to relocation" : false}
        />
        <IconItem label="LinkedIn" icon="linkedin" hasHref={true} content={data.linkedin_url} />
        <IconItem label="Resume" icon="resume" hasHref={true} content={data.resume_url} />
        <IconItem label="Personal site" icon="link" hasHref={true} content={data.website_url} />
      </IconsList>
    </Wrapper>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform:translateY(5px);
  }
  100% {
    opacity: 1;
    transform:translateY(0);
  }
`;

const Wrapper = styled.div`
  border: 1px solid ${theme.colors.foreground};
  padding: ${theme.spacing._20};
  animation: 0.35s ${fadeIn} ease-out;
  border-radius: 4px;
  margin-bottom: ${theme.spacing._20};
  background:white;
  transform-origin:center;
  transition:all 0.12s ease;

  &:hover {
    transform:scale(1.04);
    box-shadow: 0px 0px 27px -19px rgba(0,0,0,0.75);
  }
`;

const Header = styled.div`
  display:flex;
  justify-content:space-between;
`

const Title = styled.span`
  font-size: ${theme.fonts.sizes.increased};
  color: ${theme.colors.neutralText};
  display: block;
  padding:${theme.spacing._10} 0;
  display:block;
`;

const Name = styled.strong`
  font-size: ${theme.fonts.sizes.large};
  color: black;
`;

const Description = styled.p`
  line-height:24px;
  color: ${theme.colors.text};
  font-size:${theme.fonts.sizes.normal};
`;

export default ProfileCard;
