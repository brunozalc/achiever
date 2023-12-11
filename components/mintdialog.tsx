import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import AchieverNFT from "@/build/contracts/AchieverNFT.json";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import config from "../tailwind.config";

const abi = AchieverNFT.abi;
const contractConfig = {
  address: "0xEca6041E9158eFdcAa6f14DCb6A86c62A5FaF313",
  abi,
} as const;

export default function MintDialog() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mint",
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          <Check className="mr-2 h-4 w-4" /> Verify
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader className="text-black">
          <DialogTitle className="text-black">
            Mint your Achievement NFT
          </DialogTitle>
          <DialogDescription className="text-secondary-text">
            It&apos;s quick and easy!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      <DialogFooter>
        {/* {mounted && !isMinted && ( */}
        <button
          style={{ marginTop: 24 }}
        //   disabled={!mint || isMintLoading || isMintStarted}
          className="button"
          data-mint-loading={isMintLoading}
          data-mint-started={isMintStarted}
          onClick={() => mint?.()}
        >
          {isMintLoading && "Waiting for approval"}
          {isMintStarted && "Minting..."}
          {!isMintLoading && !isMintStarted && "Mint"}
        </button>

        {/* )} */}
      </DialogFooter>
    </Dialog>
  );
}
