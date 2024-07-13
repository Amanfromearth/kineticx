"use client";
import { useState, useEffect } from "react";
import { usedata, useframenum } from "@/lib/store";  // Corrected the hook names
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditableCard = () => {
  const { data, updateText } = usedata(state => ({
    data: state.data,
    updateText: state.updateText
  }));

  const framenum = useframenum(state => state.framenum);

  const [editText, setEditText] = useState("");

  useEffect(() => {
    setEditText(framenum !== -1 ? data[framenum]?.text : "");
  }, [data, framenum]);

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
    if (framenum !== -1) {
      updateText(framenum, editText);  // Corrected variable name
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Frame</CardTitle>
        <CardDescription>
          {framenum != -1 ? `Editing frame ${framenum + 1}` : "Select a frame below to edit."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            value={editText}
            onChange={handleInputChange}
            placeholder="Frame content"
            disabled={framenum === -1}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={framenum === -1}>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default EditableCard;
