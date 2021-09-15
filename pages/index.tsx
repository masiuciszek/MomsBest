import Button from "@components/elements/button"
import File from "@components/icons/file"
import FolderClosed from "@components/icons/folder.closed"
import FolderOpen from "@components/icons/folder.open"
import {css} from "@emotion/react"
import styled from "@emotion/styled"
import useToggle from "@hooks/toggle"
import type {NextPage} from "next"
import Head from "next/head"
import React, {FC, Fragment} from "react"

import data from "../data/folder-data.json"

const Page = styled.section``

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Recursion with React</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <FolderStructure />
      </Page>
    </Fragment>
  )
}

interface Item {
  id: number
  parentId: number | null
  text: string
}
interface Node extends Item {
  hasChildren: boolean
  children: Item[]
}
const formatData = (data: Array<Item>) => {
  return data.map((item: Item) => ({
    ...item,
    hasChildren: data.filter((node) => node.parentId === item.id).length > 0,
    children: data.filter((node) => node.parentId === item.id),
  }))
}

const FolderStructure = () => {
  return (
    <div>
      <Tree treeData={formatData(data)} />
    </div>
  )
}

const renderIcon = (on: boolean, hasChildren: boolean) => {
  switch (true) {
    case hasChildren && on:
      return <FolderOpen />
    case hasChildren && !on:
      return <FolderClosed />
    default:
      return <File />
  }
}

interface RowProps {
  level: number
  node: Node
}
const Row: FC<RowProps> = ({level, node, children}) => {
  const [on, toggleOn] = useToggle()
  return (
    <Fragment>
      <div
        css={css`
          margin-left: ${level * 5}rem;
        `}
      >
        <Button
          onClick={() => toggleOn()}
          styles={css`
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            border: 1px solid ${on ? "#2a3370" : "#a4aeef"};
            box-shadow: ${on ? "2px 2px 3px #ccc" : "1px 1px 1px #ccc"};
            min-width: 10rem;
            align-items: center;
            justify-content: center;
          `}
        >
          <p
            css={css`
              text-transform: uppercase;
              font-size: 0.8rem;
              margin-right: 0.3rem;
            `}
          >
            {node.text}
          </p>{" "}
          {renderIcon(on, node.hasChildren)}
        </Button>
      </div>
      {on && children}
    </Fragment>
  )
}

interface TreeProps {
  treeData: Array<Node>
  parentId?: number | null
  level?: number
}

const Tree: FC<TreeProps> = ({
  treeData,
  parentId = null,
  level = 0,
}): JSX.Element[] | any => {
  const nodes = treeData.filter((node) => node.parentId === parentId)
  return nodes.map((node) => (
    <Row key={node.id} node={node} level={level}>
      <Tree treeData={treeData} parentId={node.id} level={level + 1} />
    </Row>
  ))
}

export default Home
