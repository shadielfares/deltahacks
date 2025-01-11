import React from "react";

const LogoutContainer = ({ name }: { name: string }) => {
  const handleSignOut = () => {
    console.log(`${name} signed out.`);
  };

  return (
    <div>
      <h1>Logged in as {name}</h1>
      <button onClick={handleSignOut} className="w-full h-[52px] p-[17px] bg-[#e9efec] rounded-[10px] justify-center items-center gap-2.5 inline-flex overflow-hidden"">Sign Out</button>
    </div>
  );
};

export default LogoutContainer;