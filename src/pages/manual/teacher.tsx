import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { Router } from "../../../routes";
import { PWButton } from "../../components/button";
import { ManualHeader, PWHeader } from "../../components/header";

import {
  AddClass,
  AddOtherClass,
  EditClass,
  InviteToClass,
  OfficeHourSetting,
  Register
} from "../../components/manual/teacher";

interface IProps {
  url: any;
}

const Container = styled.div``;

const Section = styled.div`
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
  margin: auto;
  max-width: 1100px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;

const Aside = styled.div`
  display: flex;
  /* padding: 30px; */
  padding: 20px 40px 20px 0;
  min-width: 200px;
  background-color: #f9f9f9;
  flex-direction: column;
`;

const DropDown = styled.div`
  display: none;
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
  }
`;

const Content = styled.div`
  width: 800px;
  padding: 20px;
`;

type NumberType = "1" | "2" | "3" | "4" | "5" | "6";

interface IContentData {
  Component: React.ReactNode;
  name: string;
}

const TeacherContentMap = new Map<NumberType, IContentData>()
  .set("1", {
    Component: Register,
    name: "플러그 가입하기"
  })
  .set("2", {
    Component: AddClass,
    name: "클래스에 초대하기"
  })
  .set("3", {
    Component: InviteToClass,
    name: "기존 클래스에 초대"
  })
  .set("4", {
    Component: AddOtherClass,
    name: "새로운 클래스 만들기"
  })
  .set("5", {
    Component: EditClass,
    name: "클래스 편집"
  })
  .set("6", {
    Component: OfficeHourSetting,
    name: "근무시간 설정"
  });

export default class Teacher extends React.Component<IProps> {
  public render() {
    const { url } = this.props;

    return (
      <Container>
        <PWHeader activePathname={url.pathname} />
        <ManualHeader activePathname={url.pathname} />
        <Section>
          <DropDown>
            <select onChange={this.onManualSelected}>
              {_.map(this.contentKeys(), (key: NumberType) => {
                const ContentData = TeacherContentMap.get(key);
                return <option value={key}>{ContentData.name}</option>;
              })}
            </select>
          </DropDown>

          <Aside>
            {_.map(this.contentKeys(), (key: NumberType) => {
              const ContentData = TeacherContentMap.get(key);

              return (
                <PWButton
                  label={ContentData.name}
                  type="listtab"
                  onClick={_.partial(this.onManualClick, key)}
                />
              );
            })}
          </Aside>

          <Content>
            {this.renderContent(_.get(url, ["query", "id"], "1"))}
          </Content>
        </Section>
      </Container>
    );
  }

  private contentKeys = () => {
    const res = [];
    for (const key of TeacherContentMap.keys()) {
      res.push(key);
    }
    return res;
  };

  private onManualClick = (key: NumberType) => {
    Router.replaceRoute(`/manual/teacher?id=${key}`);
  };

  private onManualSelected = (event: any) => {
    const value = event.target.value;
    Router.replaceRoute(`/manual/teacher?id=${value}`);
  };

  private renderContent = (id: NumberType) => {
    const TargetComponent = TeacherContentMap.get(id)!.Component as any;
    return <TargetComponent />;
  };
}
