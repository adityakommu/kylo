import * as angular from "angular";
import {Subject} from "rxjs/Subject";

import {DomainType} from "../../services/DomainTypesService";
import { Injectable } from "@angular/core";

/**
 * Manages communication between {@link DomainTypeDetailsComponent} and its individual sections.
 */

@Injectable()
export class DomainTypeDetailsService {

    /**
     * Event bus for cancel button notifications.
     */
    private cancelSubject = new Subject<DomainType>();

    /**
     * Event bus for delete button notifications.
     */
    private deleteSubject = new Subject<DomainType>();

    /**
     * Event bus for save failure notifications.
     */
    private failureSubject = new Subject<any>();

    /**
     * Event bus for save notifications.
     */
    private saveSubject = new Subject<DomainType>();

    /**
     * Observable for cancel button notifications.
     */
    get cancelled() {
        return this.cancelSubject.asObservable();
    }

    /**
     * Observable for delete button notifications.
     */
    get deleted() {
        return this.deleteSubject.asObservable();
    }

    /**
     * Observable for save failure notifications.
     */
    get failed() {
        return this.failureSubject.asObservable();
    }

    /**
     * Observable for save notifications.
     */
    get saved() {
        return this.saveSubject.asObservable();
    }

    /**
     * Called when the user cancels an edit operation.
     */
    cancelEdit(domainType: DomainType) {
        this.cancelSubject.next(domainType);
    }

    /**
     * Called when the user deletes a domain type.
     */
    deleteDomainType(domainType: DomainType) {
        this.deleteSubject.next(domainType);
    }

    /**
     * Called when a save operation results in a failure.
     */
    fail(error: any) {
        this.failureSubject.next(error);
    }

    /**
     * Called when the user saves a domain type.
     */
    saveEdit(domainType: DomainType) {
        return this.saveSubject.next(domainType);
    }
}
