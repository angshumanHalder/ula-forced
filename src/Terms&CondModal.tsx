import { useEffect, useState } from "react";
import { handleKeyPress, initialize, reset } from "./utils";

const condText = `The services are provided on an as-is and as-available basis. \
You agree that your use of the services will be at your sole risk. \
To the fullest extent permitted by law, we disclaim all warranties, \
express or implied, in connection with the services and your use thereof, \
including, without limitation, the implied warranties of merchantability, \
fitness for a particular purpose, and non-infringement. \
We make no warranties or representations about the accuracy or completeness \
of the services' content or the content of any websites or mobile applications \
linked to the services and we will assume no liability or responsibility.`

export default function TermsAndCondModal({
  open,
  onClose,
  agreementHandler,
}: {
  open: boolean,
  onClose: Function,
  agreementHandler: Function,
}) {

  const [percentage, setPercentage] = useState(0);

  const renderCondText = (text: string) => {
    const words = text.split(" ");
    const comps: React.ReactElement[] = [];
    words.forEach((w, i) => {
      comps.push(
        <div key={`${i}-${w}`} className="mx-0.5 inline-block">
          {w.trim().split("").map((l, i) => <div key={`${i}-${l}`} className="inline-block ">{l}</div>)}
        </div>
      )
    });
    return comps;
  }

  const enableButton = (percentage: number) => {
    setPercentage(percentage);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    initialize(enableButton);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      reset();
    }
  }, []);


  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
      <div className={`bg-white rounded-xl shadow p-2 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
        <div className="w-[32rem] p-2 min-h-60">
          <h2 className="text-2xl mb-3">Terms {'&'} Conditions</h2>
          <h3 className="text-xl mb-3">You need at least 60% accuracy. Hit space after you reach at the end. Start typing...</h3>
          <div className="border-2 rounded-md p-1 h-50 text-sm text-stone-400 relative mb-3" id="word-container">
            <div id="caret" className="h-4 w-0.5 absolute opacity-100 origin-top-left bg-stone-500" />
            {renderCondText(condText)}
          </div>
          <div className="flex p-1 justify-between">
            <div className="text-l">{percentage} %</div>
            <div className="flex">
              <button
                className="rounded-md border border-indigo-600 text-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1"
                onClick={() => onClose()}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={percentage < 60}
                onClick={() => {
                  agreementHandler(true)
                  onClose();
                }}
              >
                Agree
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



/*  */
