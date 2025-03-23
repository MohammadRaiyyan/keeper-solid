import { Index } from "solid-js";
import { Portal } from "solid-js/web";

import type { DatePickerValueChangeDetails, DateValue } from "@ark-ui/solid";
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "../ui/date-picker.tsx";
import { Flex } from "../ui/flex";

export function ReusableDatePicker(props: {
  label: string;
  placeholder: string;
  startOfWeek?: number;
  class?: string;
  onChange: (value: DatePickerValueChangeDetails) => void;
  value?: DateValue[];
}) {
  return (
    <DatePicker
      startOfWeek={props.startOfWeek ?? 1}
      format={(e) => {
        const parsedDate = new Date(Date.parse(e.toString()));

        const normalizedDate = new Date(
          parsedDate.getUTCFullYear(),
          parsedDate.getUTCMonth(),
          parsedDate.getUTCDate(),
        );

        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(normalizedDate);
      }}
      class={props.class ?? "w-full"}
      selectionMode="single"
      onValueChange={(value) => props.onChange(value)}
      value={props.value}
    >
      <DatePickerControl class="w-full flex flex-col items-start">
        <DatePickerLabel class="text-sm">{props.label}</DatePickerLabel>
        <Flex class="gap-2">
          <DatePickerInput placeholder={props.placeholder} class="w-full" />
          <DatePickerTrigger />
        </Flex>
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          <Index each={api().weekDays}>
                            {(weekDay) => (
                              <DatePickerTableHeader>
                                {weekDay().short}
                              </DatePickerTableHeader>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        <Index each={api().weeks}>
                          {(week) => (
                            <DatePickerTableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePickerTableCell value={day()}>
                                    <DatePickerTableCellTrigger>
                                      {day().day}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index
                          each={api().getMonthsGrid({
                            columns: 4,
                            format: "short",
                          })}
                        >
                          {(months) => (
                            <DatePickerTableRow>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePickerTableCell value={month().value}>
                                    <DatePickerTableCellTrigger>
                                      {month().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index each={api().getYearsGrid({ columns: 4 })}>
                          {(years) => (
                            <DatePickerTableRow>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePickerTableCell value={year().value}>
                                    <DatePickerTableCellTrigger>
                                      {year().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </DatePicker>
  );
}
