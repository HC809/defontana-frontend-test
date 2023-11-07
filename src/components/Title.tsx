import React from "react";
import { UserCircleIcon, CodeBracketIcon } from "@heroicons/react/24/solid";

export const Title = React.memo(() => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-800">
      <UserCircleIcon className="inline-block w-6 h-6 text-purple-500 mr-2" />
      Hector Caballero
    </h2>
    <a
      href="https://github.com/HC809/defontana-frontend-test"
      className="text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out"
      target="_blank"
      rel="noopener noreferrer"
    >
      <CodeBracketIcon className="inline-block w-6 h-6 text-purple-500 mr-2" />
      <span className="hidden md:inline">Repositorio GitHub</span>
    </a>
  </div>
));
