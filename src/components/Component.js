/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Datepicker, Input, initTE } from "tw-elements";

useEffect(() => {
    initTE({ Datepicker, Input });
}, []);
