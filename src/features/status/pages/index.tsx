import React from "react";
import { useStatus } from "../hooks/useStatus";
import StatusAction from "./action";
import { Button } from "@/components/ui/button";
import Preview from "@/components/preview/preview";
import { Edit, Plus, Trash } from "lucide-react";

const StatusList = () => {
  const { list, handleDelete } = useStatus();
  const [statusAction, setStatusAction] = React.useState<{
    open: boolean;
    type: "create" | "edit";
    statusId?: string;
  }>({
    open: false,
    type: "create",
    statusId: undefined,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold text-lg">Status List</h1>
        <Button
          variant={"outline"}
          onClick={() => {
            setStatusAction({ open: true, type: "create" });
          }}
        >
          <Plus />
          Add Status
        </Button>
      </div>
      <div>
        {list?.data?.data?.map((item, index) => {
          return (
            <div
              className="grid grid-cols-5 border border-border  rounded-md p-4 my-2"
              key={index}
            >
              <Preview title={"Name"} children={item.name} />
              <Preview title={"Description"} children={item.description} />
              <Preview title={"Sequence"} children={item.sequence} />
              <Preview
                title={"Color"}
                children={
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full`}
                      style={{ backgroundColor: item.color }}
                    ></div>
                    {item.color}
                  </div>
                }
              />
              <div className="flex flex-row items-center gap-2">
                <Button
                  size={"icon"}
                  onClick={() => {
                    setStatusAction({
                      open: true,
                      type: "edit",
                      statusId: item.id,
                    });
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  size={"icon"}
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  variant={"destructive"}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <StatusAction
        open={statusAction.open}
        onOpenChange={(open) => {
          setStatusAction((prev) => ({ ...prev, open }));
        }}
        type={statusAction.type}
        statusId={statusAction.statusId}
      />
    </div>
  );
};

export default StatusList;
