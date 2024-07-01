import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter implements CalendarEventTitleFormatter {

constructor(@Inject(LOCALE_ID) private locale: string) {
  }
  monthTooltip(event: CalendarEvent<any>, title: string): string {
     return this.month(event)
  }
  weekTooltip(event: CalendarEvent<any>, title: string): string {
   return this.week(event);
  }
  dayTooltip(event: CalendarEvent<any>, title: string): string {
  return this.day(event);
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

  week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

  day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

public dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

}
