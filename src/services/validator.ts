export interface ValidatorRule {
    validator: (...input: any[]) => boolean;
    failMessage: string;
    data: any[];
}

export interface ValidationResult {
    ok: boolean;
    message: string;
}

export class Validator {
    constructor(private rules: ValidatorRule[]) {
    }

    private execValidator(validator: (...input: any[]) => boolean, data: any[]): boolean {
        return validator(...data);
    }

    public addRules(rules: ValidatorRule[]): Validator {
        this.rules = rules;
        return this;
    }

    public validate(): ValidationResult {
        let failedIdx = -1;
        const allPassed = this.rules.every((rule, index) => {
            if (!this.execValidator(rule.validator, rule.data)) {
                failedIdx = index;
                return false;
            }
            return true;
        });

        return {
            ok: allPassed,
            message: failedIdx > -1 ? this.rules[failedIdx].failMessage : '',
        };
    }
}
