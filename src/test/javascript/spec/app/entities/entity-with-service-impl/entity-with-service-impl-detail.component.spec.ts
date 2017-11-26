/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplDetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl-detail.component';
import { EntityWithServiceImplService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.service';
import { EntityWithServiceImpl } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImpl Management Detail Component', () => {
        let comp: EntityWithServiceImplDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplDetailComponent>;
        let service: EntityWithServiceImplService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplDetailComponent],
                providers: [
                    EntityWithServiceImplService
                ]
            })
            .overrideTemplate(EntityWithServiceImplDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceImpl(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceImpl).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
