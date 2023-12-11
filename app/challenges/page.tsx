"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MintDialog from "@/components/mintdialog";

type Challenge = {
  id: number;
  name: string;
  difficulty: number;
};

type DifficultyProps = {
  difficulty: number;
};

const challenges: Challenge[] = [
  { id: 1, name: "Challenge One", difficulty: 1 },
  { id: 2, name: "Challenge Two", difficulty: 3 },
  { id: 3, name: "Challenge Three", difficulty: 4 },
  { id: 4, name: "Challenge Four", difficulty: 5 },
  { id: 5, name: "Challenge Five", difficulty: 2 },
];

const colorClasses: { [key: number]: string } = {
  1: "bg-green-500",
  2: "bg-blue-500",
  3: "bg-yellow-500",
  4: "bg-orange-500",
  5: "bg-red-500",
};

const DifficultyIndicator: React.FC<DifficultyProps> = ({ difficulty }) => {
  return (
    <div className="flex">
      {[...Array(difficulty)].map((_, index) => (
        <span
          key={index}
          className={`h-4 w-4 rounded mr-1 ${colorClasses[difficulty]}`}
        />
      ))}
    </div>
  );
};

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg bg-[#121212] m-4 p-4">
          <h3 className="font-bold text-xl mb-2 text-white">
            {challenge.name}
          </h3>
          <DifficultyIndicator difficulty={challenge.difficulty} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Did you complete {challenge.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Verify your completion!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Assuming MintDialog is a component that handles the 'continue' action */}
          <MintDialog />
          {/* If MintDialog is not a button, use AlertDialogAction for the 'continue' action */}
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ChallengesPage: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#23252A]">
        <div className="absolute top-0 right-0 m-4">
          <ConnectButton />
        </div>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </>
  );
};

export default ChallengesPage;
