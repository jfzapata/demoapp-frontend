import { ToastrService } from 'ngx-toastr';

// Own
// Utils
import { ServiceLocator } from '@app/common/utils/service-locator';

/**
 * A generic function that presents a toas message.
 *
 * @param message The message.
 * @param status The status.
 */
export function presentToast(message: string, status: string) {
  const toastr: ToastrService = ServiceLocator.injector.get(
    ToastrService
  );
  toastr[status](message);
}
