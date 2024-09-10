import { ChangeEvent, useContext, useState } from "react";

import { ChatContext } from "../stores/ChatContext";

const UserMenu = () => {
  const { setUiStep, setUsername } = useContext(ChatContext);
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickname !== "") {
      setUsername(nickname);
      setUiStep(1);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Set your nickname</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="nickname">Nickname:</label>
            <input
              className="text-center text-slate-700 rounded-md h-10"
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="justify-self-center h-10 w-[40%] font-semibold rounded-md border border-slate-200 hover:border:none hover:bg-slate-200 hover:text-slate-700"
            type="submit"
          >
            Set nickname
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserMenu;
