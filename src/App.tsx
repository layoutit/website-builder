import React from "react";
import { Modal } from "../components/common/Modal";
import { Content, Footer, Header, Layout, Sidebar } from "../components/layout";
import { BootstrapModal } from "../components/view/ComponentsModal";
import { ComponentsSidebar } from "../components/view/ComponentsSidebar";
import { HeaderMenu } from "../components/view/HeaderMenu";
import { ViewContent } from "../components/view/ViewContent";
import { useBuilderUiContext } from "../store";

export function App() {
  const { previewMode } = useBuilderUiContext();

  return (
    <>
      <Layout>
        <Header>
          <HeaderMenu />
        </Header>
        {!previewMode && (
          <Sidebar>
            <ComponentsSidebar />
          </Sidebar>
        )}
        <Content>
          <ViewContent />
          <Footer>
            Using{" "}
            <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
              Bootstrap 5.3.8
            </a>
          </Footer>
        </Content>
      </Layout>
      <Modal {...BootstrapModal} />
    </>
  );
}
