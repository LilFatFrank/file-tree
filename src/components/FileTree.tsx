import React, { useState } from 'react'
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

const TreeNode: React.FC<TreeNodeProps> = ({ name, kind, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = kind === 'directory' && children && children.length > 0
  const icon = hasChildren ? (isOpen ? faFolderOpen : faFolder) : faFile

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div>
      <div className="tree-node" onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />
        <span>{name}</span>
      </div>
      {isOpen && hasChildren && (
        <div className="tree-children">
          {children.map((child, index) => (
            <TreeNode key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  )
}

const FileTree: React.FC<{ data: TreeNodeProps }> = ({ data }) => {
  return <TreeNode {...data} />
}

export default FileTree
