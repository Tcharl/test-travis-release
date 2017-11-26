/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassDetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class-detail.component';
import { EntityWithServiceClassService } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class.service';
import { EntityWithServiceClass } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClass Management Detail Component', () => {
        let comp: EntityWithServiceClassDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassDetailComponent>;
        let service: EntityWithServiceClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassDetailComponent],
                providers: [
                    EntityWithServiceClassService
                ]
            })
            .overrideTemplate(EntityWithServiceClassDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceClass(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceClass).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
