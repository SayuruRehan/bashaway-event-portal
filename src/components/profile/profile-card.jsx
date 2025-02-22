import { Scroll } from "lucide-react";
import { isEmpty } from "lodash";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { toggleAddMemberDialog } from "@/store/reducers/ui/profile";
import { isSafari } from "@/utils";
import { AnimatedSwitcher, Badge, Button, Skeleton } from "@sliit-foss/bashaway-ui/components";
import { Callout } from "@sliit-foss/bashaway-ui/typography";

const openAddMemberDialog = () => store.dispatch(toggleAddMemberDialog(true));

export const ProfileCard = ({ member, loading }) => {
  return (
    <div
      className={twMerge(
        "group w-full animated-border text-border from-black/20 to-border p-5 rounded-3xl",
        !isSafari ? "h-full " : ""
      )}
    >
      <AnimatedSwitcher
        show={!loading}
        component={
          <AnimatedSwitcher
            show={!isEmpty(member)}
            component={
              <div className="w-full h-full flex flex-col p-5 gap-4 rounded-2xl transition-all duration-medium card-red cursor-default">
                <span className="text-[23px] md:text-[25px] lg:text-[26px] text-start transition-all duration-medium card-red-title filter group-hover:brightness-150 font-bold leading-[1.75rem]">
                  {member?.name}
                </span>
                <span className="flex flex-col filter group-hover:brightness-125 transition-all duration-medium">
                  <Callout className="card-red-body text-start font-medium">{member?.email}</Callout>
                  <Callout className="card-red-body text-start">{member?.phone}</Callout>
                </span>
                <Badge className="border flex self-start justify-center items-center gap-1.5 card-red-badge">
                  Year {member?.academic_year}
                  <Scroll className="translate-y-[-0.025rem]" size={14} />
                </Badge>
              </div>
            }
            alternateComponent={
              <div className="w-full h-full min-h-[193px] flex flex-col justify-center items-center p-5 rounded-2xl bg-gray-100">
                <Button onClick={openAddMemberDialog}>Add</Button>
              </div>
            }
          />
        }
        alternateComponent={
          <Skeleton containerClassName="flex" className="flex flex-col p-5 gap-6 rounded-2xl">
            <Skeleton className="w-3/4 md:w-1/2 h-[1.24rem] md:h-[1.4rem] lg:h-[1.45rem]" shade="dark" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-3/4 h-[0.8rem] md:h-[1.08rem] mb-[0.11rem]" shade="dark" />
              <Skeleton className="w-1/2 h-[0.8rem] md:h-[1.08rem]" shade="dark" />
            </div>
            <div className="self-start flex items-center gap-1.5 border-2 border-black/5 px-4 py-2 rounded-full z-50">
              <Skeleton className="w-[2.7rem] h-3 rounded-lg" shade="dark" />
              <Scroll className="translate-y-[-0.025rem]" size={14} />
            </div>
          </Skeleton>
        }
      />
    </div>
  );
};

export default ProfileCard;
