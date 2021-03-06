import path from 'path';
import { expect } from 'chai';
import { create } from '../../js/index';
import { Engine } from '../../js/engine';

describe('Compiler.destroy', () => {
    let compiler: Engine;

    before(done => {
        create(path.join(__dirname, '../../dist/ferret.wasm'))
            .then(engine => {
                compiler = engine;
            })
            .finally(done);
    });

    it('should destroy compiled program', async () => {
        const program = compiler.compile(`RETURN TRUE`);

        const res = await program.run();

        expect(res).to.be.true;

        program.destroy();

        let failed = false;

        try {
            await program.run();
        } catch (e) {
            failed = true;
        }

        expect(failed).to.be.true;
    });
});
