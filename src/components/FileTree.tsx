import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFolder,
  faFolderOpen,
  faFile,
} from '@fortawesome/free-solid-svg-icons'

export interface TreeNodeProps {
  name: string
  kind: 'file' | 'directory'
  size?: string
  modified?: string
  children?: TreeNodeProps[]
}

const TreeNode: React.FC<
  TreeNodeProps & {
    selected: string
    setSelected: (path: string) => void
    path: string
    globalExpand: boolean
  }
> = ({ name, kind, children, selected, setSelected, path, globalExpand }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = kind === 'directory' && children && children.length > 0
  const icon = hasChildren ? (isOpen ? faFolderOpen : faFolder) : faFile

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
    setSelected(path)
  }

  const isSelected = selected === path

  useEffect(() => {
    setIsOpen(globalExpand)
  }, [globalExpand])

  return (
    <div>
      <div
        className={`tree-node${isSelected ? ' selected' : ''}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={icon} />
        <span>{name}</span>
      </div>
      {isOpen && hasChildren ? (
        <div className="tree-children">
          {children.map((child, index) => (
            <TreeNode
              key={index}
              {...child}
              selected={selected}
              setSelected={setSelected}
              path={`${path}/${child.name}`}
              globalExpand={globalExpand}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

const FileTree: React.FC<{ data: TreeNodeProps }> = ({ data }) => {
  const [selected, setSelected] = useState('')
  const [globalExpand, setGlobalExpand] = useState(false)

  const handleExpandCollapse = () => {
    setGlobalExpand(!globalExpand)
  }

  return (
    <div>
      <button onClick={handleExpandCollapse}>
        {globalExpand ? 'Collapse All' : 'Expand All'}
      </button>
      <TreeNode
        {...data}
        selected={selected}
        setSelected={setSelected}
        path={data.name}
        globalExpand={globalExpand}
      />
    </div>
  )
}

export default FileTree
