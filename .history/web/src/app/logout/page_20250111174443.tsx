import React from "react";

const LogoutContainer = ({ name }: { name: string }) => {
  const handleSignOut = () => {
    console.log(`${name} signed out.`);
  };

  return (
    <div>
      <h1>Logged in as {name}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default LogoutContainer;
