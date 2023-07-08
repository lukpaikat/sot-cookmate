import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { foodDescription } from "../../global/foodData";

const FoodDialog = ({ onFoodSelected, currentFood, stopTimer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAutoStopOnFoodChange, setIsAutoStopOnFoodChange] =
    React.useState(true);

  const handleFoodSelect = foodType => {
    onFoodSelected(foodType);
    setIsOpen(false);
    if (isAutoStopOnFoodChange) {
      stopTimer();
    }
  };

  const toggleAutoStop = () => {
    setIsAutoStopOnFoodChange(prevState => {
      const newState = !prevState;
      localStorage.setItem("isAutoStopOnFoodChange", newState.toString());
      return newState
    });
  };

  React.useEffect(() => {
    const storedAutoStopPreferenceString = localStorage.getItem(
      "isAutoStopOnFoodChange"
    );
    const storedAutoStopPreference = storedAutoStopPreferenceString !== "false";
    setIsAutoStopOnFoodChange(storedAutoStopPreference);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsThreeVertical
            size={32}
            weight="bold"
            className="text-stone-50"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs overflow-auto">
        <DialogHeader>
          <DialogTitle>Food Types</DialogTitle>
          <DialogDescription>Select food by types</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {Object.keys(foodDescription).map(key => {
            return (
              <Button
                key={key}
                onClick={() => handleFoodSelect(key)}
                variant="secondary"
                className={`block h-fit ${
                  currentFood === key
                    ? "dark:bg-green-800 dark:hover:bg-green-900"
                    : ""
                }`}
              >
                <div className="text-left">
                  <h1 className="text-3xl font-bold">
                    {foodDescription[key].label}
                  </h1>
                  <p>{foodDescription[key].description}</p>
                </div>
              </Button>
            );
          })}
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="stopCurrentTime">Stop running timer on select food</Label>
            <Switch
              checked={isAutoStopOnFoodChange}
              onCheckedChange={toggleAutoStop}
              id="stopCurrentTime"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDialog;
