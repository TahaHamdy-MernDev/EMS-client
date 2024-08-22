import { createStandaloneToast } from "@chakra-ui/react";
import { standALoneToast } from "./toast";
const { toast } = createStandaloneToast();

async function checkGeolocationPermissions(): Promise<PermissionStatus> {
  if (navigator.permissions) {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation",
    });
    return permissionStatus;
  } else {
    // Fallback for browsers that do not support the Permissions API
    return { state: "granted" } as PermissionStatus;
  }
}

export function getUserLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast({
        status: "error",
        title: "Geolocation Error",
        position: "top-right",
        description: "Geolocation is not supported by your browser",
        duration: 5000,
        isClosable: true,
      });
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    checkGeolocationPermissions()
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
        //   standALoneToast({
        //     status: "info",
        //     title: "Location Access Denied",
        //     position: "top-right",
        //     description:
        //       "Please enable location access in your browser settings.",
          
        //   });

        //   reject(
            alert(
              "Location access is denied. Please enable it in your browser settings."
            )
        //   );
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            let errorMessage = "";

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "You denied the request for Geolocation.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                errorMessage = "The request to get your location timed out.";
                break;
              default:
                errorMessage = "An unknown error occurred.";
                break;
            }

            standALoneToast({
              status: "error",
              title: "Location Error",
              position: "top-right",
              description: errorMessage,
              duration: 5000,
              isClosable: true,
            });
            alert(`Unable to retrieve your location: ${errorMessage}`);
          }
        );
      })
      .catch((err) => {
        standALoneToast({
          status: "error",
          title: "Permissions Error",
          position: "top-right",
          description: "Failed to check geolocation permissions.",
          duration: 5000,
          isClosable: true,
        });
        alert("Failed to check geolocation permissions.");
      });
  });
}
