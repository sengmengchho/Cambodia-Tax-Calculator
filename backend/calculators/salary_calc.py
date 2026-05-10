"""
Tax 02: Salary Tax Calculator
Based on Cambodian Tax Law - ITC Economy for Engineer Course
"""

def calculate_salary_tax(salary: float, dependents: int, is_resident: bool,
                          fringe_benefits: float = 0, loan_advance: float = 0) -> dict:
    """
    Calculate monthly salary tax for Cambodia.
    
    Args:
        salary: Monthly salary in KHR
        dependents: Number of dependents (non-working spouse + qualifying children)
        is_resident: True if taxpayer is a resident (>182 days/year in Cambodia)
        fringe_benefits: Additional fringe benefits in KHR
        loan_advance: Advance/loan from employer (added to taxable income)
    
    Returns:
        dict with tax breakdown
    """

    # Non-resident: flat 20% on Cambodian-source salary
    if not is_resident:
        taxable_salary = salary + fringe_benefits + loan_advance
        fringe_tax = fringe_benefits * 0.20
        salary_tax = salary * 0.20
        total_tax = salary_tax + fringe_tax
        return {
            "is_resident": False,
            "gross_salary": salary,
            "fringe_benefits": fringe_benefits,
            "loan_advance": loan_advance,
            "taxable_salary": taxable_salary,
            "deductions": 0,
            "tax_base": taxable_salary,
            "rate": "20% (flat)",
            "salary_tax": round(salary_tax),
            "fringe_tax": round(fringe_tax),
            "total_tax": round(total_tax),
            "net_salary": round(salary - salary_tax)
        }

    # Resident: progressive rates
    # Deduction: 150,000 KHR per dependent (non-working spouse counts as 1)
    deduction = dependents * 150_000

    # Fringe benefits taxed separately at 20%
    fringe_tax = fringe_benefits * 0.20

    # Taxable salary base (salary + loan advance - deductions)
    tax_base = salary + loan_advance - deduction
    tax_base = max(tax_base, 0)

    # Progressive tax brackets (KHR/month)
    salary_tax = _progressive_tax(tax_base)
    total_tax = salary_tax + fringe_tax

    # Determine bracket
    rate_label = _get_rate_label(tax_base)

    return {
        "is_resident": True,
        "gross_salary": salary,
        "fringe_benefits": fringe_benefits,
        "loan_advance": loan_advance,
        "taxable_salary": salary + loan_advance,
        "deductions": deduction,
        "tax_base": tax_base,
        "rate": rate_label,
        "salary_tax": round(salary_tax),
        "fringe_tax": round(fringe_tax),
        "total_tax": round(total_tax),
        "net_salary": round(salary - salary_tax)
    }


def _progressive_tax(tax_base: float) -> float:
    """Apply progressive tax brackets."""
    if tax_base <= 1_500_000:
        return 0
    elif tax_base <= 2_000_000:
        return tax_base * 0.05 - 75_000
    elif tax_base <= 8_500_000:
        return tax_base * 0.10 - 175_000
    elif tax_base <= 12_500_000:
        return tax_base * 0.15 - 600_000
    else:
        return tax_base * 0.20 - 1_225_000


def _get_rate_label(tax_base: float) -> str:
    if tax_base <= 1_500_000:
        return "0%"
    elif tax_base <= 2_000_000:
        return "5%"
    elif tax_base <= 8_500_000:
        return "10%"
    elif tax_base <= 12_500_000:
        return "15%"
    else:
        return "20%"