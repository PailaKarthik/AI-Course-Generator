"use client"
import React ,{ useState } from "react";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <TabsList>
        {React.Children.map(children, (child, index) => (
          <TabsTrigger
            key={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export const TabsList = ({ children }) => <div className="tabs-list">{children}</div>;

export const TabsTrigger = ({ isActive, onClick, children }) => (
  <button
    className={`tabs-trigger ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ children }) => <div className="tabs-content">{children}</div>;
