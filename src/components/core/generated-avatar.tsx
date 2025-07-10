import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    const generateAvatar = async () => {
      const avatar =
        variant === "botttsNeutral"
          ? createAvatar(botttsNeutral, { seed })
          : createAvatar(initials, {
              seed,
              fontWeight: 500,
              fontSize: 42,
            });

      const uri = await avatar.toDataUri(); // wait for async toDataUri
      setAvatarUri(uri);
    };

    generateAvatar();
  }, [seed, variant]);

  return (
    <Avatar className={cn(className)}>
      {avatarUri ? (
        <AvatarImage src={avatarUri} alt="Avatar" />
      ) : (
        <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
      )}
    </Avatar>
  );
};
