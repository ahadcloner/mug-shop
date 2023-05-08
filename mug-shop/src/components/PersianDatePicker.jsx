import React, {useState} from "react"
import DatePicker from "react-multi-date-picker"
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"


function PersianDatePicker({date ,date_setter}) {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    return (
        <div style={{ direction: "rtl" ,width:"100%"}}>
            <DatePicker
                digits={digits}
                value={date}
                onChange={date_setter}
                animations={[
                    opacity(),
                    transition({
                        from: 40,
                        transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                    }),
                ]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-center"
            />
        </div>
    )
}
export default PersianDatePicker;