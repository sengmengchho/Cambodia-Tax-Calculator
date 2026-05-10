"""
Tax 03: Prepayment Tax on Profit (ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ)
Based on Cambodian Tax Law - ITC Economy for Engineer Course
"""

def calculate_prepayment_tax(monthly_revenue: float, includes_vat: bool = True) -> dict:
    """
    Calculate monthly prepayment tax on profit.
    
    Rate: 1% of monthly revenue (tax base)
    For VAT-registered businesses: tax base = revenue / 1.1
    
    Args:
        monthly_revenue: Monthly gross revenue in KHR
        includes_vat: True if revenue figure already includes VAT (10%)
    
    Returns:
        dict with prepayment tax breakdown
    """
    if includes_vat:
        tax_base = monthly_revenue / 1.1
    else:
        tax_base = monthly_revenue

    prepayment_tax = tax_base * 0.01

    return {
        "monthly_revenue": monthly_revenue,
        "includes_vat": includes_vat,
        "tax_base": round(tax_base),
        "rate": "1%",
        "prepayment_tax": round(prepayment_tax),
        "note": "This amount will be credited against your annual profit tax (CIT)"
    }


def calculate_penalty(tax_due: float, tax_paid: float, months_overdue: int,
                       has_accounting_records: bool = True) -> dict:
    """
    Calculate penalty and interest for late/underpayment.
    Based on Tax 01 penalty rules.
    
    Args:
        tax_due: Correct tax amount (KHR)
        tax_paid: Amount actually paid (KHR)
        months_overdue: Number of months late
        has_accounting_records: False = unilateral assessment (40% penalty)
    
    Returns:
        dict with penalty breakdown
    """
    shortfall = tax_due - tax_paid
    shortfall = max(shortfall, 0)

    if shortfall == 0:
        return {"shortfall": 0, "penalty": 0, "interest": 0, "total_due": 0}

    # Determine penalty rate
    if not has_accounting_records:
        penalty_rate = 0.40
        penalty_label = "40% (Unilateral Assessment)"
    else:
        underpayment_ratio = shortfall / tax_due if tax_due > 0 else 0
        if underpayment_ratio < 0.10:
            penalty_rate = 0.10
            penalty_label = "10% (Minor Underpayment)"
        else:
            penalty_rate = 0.25
            penalty_label = "25% (Significant Underpayment)"

    # Minor offense fine (fixed)
    minor_offense_fine = 2_000_000  # KHR

    penalty = shortfall * penalty_rate
    interest_rate = 0.015  # 1.5% per month
    interest = shortfall * interest_rate * months_overdue

    total_due = shortfall + penalty + interest

    return {
        "tax_due": tax_due,
        "tax_paid": tax_paid,
        "shortfall": round(shortfall),
        "penalty_rate": penalty_label,
        "penalty": round(penalty),
        "interest_rate": "1.5% per month",
        "months_overdue": months_overdue,
        "interest": round(interest),
        "minor_offense_fine": minor_offense_fine,
        "total_due": round(total_due),
        "grand_total": round(total_due + minor_offense_fine)
    }


def calculate_patent_tax(taxpayer_size: str, years_unpaid: int,
                          months_overdue: int) -> dict:
    """
    Calculate patent tax (ពន្ធបា៉ាតង់) penalties.
    Annual patent tax: 1,200,000 KHR
    
    Args:
        taxpayer_size: 'small', 'medium', or 'large'
        years_unpaid: Number of years patent tax not paid
        months_overdue: Months since last payment deadline
    """
    annual_patent_tax = 1_200_000  # KHR per year

    total_patent = annual_patent_tax * years_unpaid
    penalty = total_patent * 0.10  # 10% penalty for late filing
    interest = total_patent * 0.015 * months_overdue

    return {
        "annual_patent_tax": annual_patent_tax,
        "years_unpaid": years_unpaid,
        "total_patent_due": total_patent,
        "penalty_10pct": round(penalty),
        "interest_rate": "1.5% per month",
        "months_overdue": months_overdue,
        "interest": round(interest),
        "minor_offense_fine": 2_000_000,
        "total_due": round(total_patent + penalty + interest + 2_000_000)
    }



def calculate_public_lighting_tax(product: str, revenue: float,
                                   includes_vat: bool = True,
                                   includes_lighting: bool = True) -> dict:
    """
    Calculate Public Lighting Tax (អាករសម្រាប់បំភ្លឺសាធារណៈ)
    
    Rate: 5% — only applies to:
        - ស្រា (Wine/Liquor)
        - Beer
        - បារី (Cigarette)
        - ភេសជ្ជៈ (Sugary Beverages)
    
    Other products are NOT subject to this tax.
    """

    ELIGIBLE_PRODUCTS = {
        'wine':      'ស្រា (Wine/Liquor)',
        'ស្រា':      'ស្រា (Wine/Liquor)',
        'liquor':    'ស្រា (Wine/Liquor)',
        'beer':      'Beer 🍺',
        'cigarette': 'បារី (Cigarette)',
        'បារី':      'បារី (Cigarette)',
        'beverage':  'ភេសជ្ជៈ (Sugary Beverage)',
        'ភេសជ្ជៈ':  'ភេសជ្ជៈ (Sugary Beverage)',
    }

    product_key = product.lower().strip()

    # Check if product is eligible
    if product_key not in ELIGIBLE_PRODUCTS:
        return {
            "product": product,
            "revenue": revenue,
            "status": "❌ NOT ELIGIBLE",
            "lighting_tax": 0,
            "note": "Public Lighting Tax only applies to: ស្រា, Beer, បារី, ភេសជ្ជៈ"
        }

    # Calculate tax base
    if includes_vat and includes_lighting:
        tax_base = revenue / (1.1 * 1.05)
    elif includes_vat and not includes_lighting:
        tax_base = revenue / 1.1
    else:
        tax_base = revenue

    lighting_tax = tax_base * 0.05

    return {
        "product": ELIGIBLE_PRODUCTS.get(product_key, product),
        "gross_revenue": round(revenue, 2),
        "status": "✅ Eligible",
        "includes_vat": includes_vat,
        "includes_lighting_tax": includes_lighting,
        "tax_base": round(tax_base, 2),
        "rate": "5%",
        "lighting_tax": round(lighting_tax, 2),
        "note": "Public Lighting Tax = sub-national tax collected monthly"
    }



def calculate_special_tax(product: str, selling_price: float, 
                           includes_vat: bool = True,
                           includes_special_tax: bool = True) -> dict:
    """
    Calculate Special Tax (អាករពិសេស)
    
    Rates:
        ស្រា (Wine/Liquor)  = 35%
        Beer                = 30% (calculated on 90% of tax base)
        បារី (Cigarette)    = 25%
        ភេសជ្ជៈ (Beverage)  = 20%
        កាស្បូ (Casino)     = 10%
        ស៊ីម៉ង់ត៍ (Cement)  = 5% (exempted 2025-2026, starts 2027)
    
    Note: Beer is special — calculated on 90% of tax base
    """
    import datetime
    current_year = datetime.datetime.now().year

    # Tax rates
    rates = {
        'wine':     0.35,
        'beer':     0.30,
        'cigarette': 0.25,
        'beverage': 0.20,
        'casino':   0.10,
        'cement':   0.05,
    }

    # Product name mapping (Khmer → key)
    product_map = {
        'ស្រា': 'wine',
        'wine': 'wine',
        'liquor': 'wine',
        'beer': 'beer',
        'បារី': 'cigarette',
        'cigarette': 'cigarette',
        'ភេសជ្ជៈ': 'beverage',
        'beverage': 'beverage',
        'កាស្បូ': 'casino',
        'casino': 'casino',
        'ស៊ីម៉ង់ត៍': 'cement',
        'cement': 'cement',
    }

    product_key = product_map.get(product.lower(), product.lower())

    if product_key not in rates:
        return {"error": f"Product '{product}' not found. Choose: wine, beer, cigarette, beverage, casino, cement"}

    # Cement exemption check (2025–2026)
    if product_key == 'cement':
        if 2025 <= current_year <= 2026:
            return {
                "product": "ស៊ីម៉ង់ត៍ (Cement)",
                "selling_price": selling_price,
                "rate": "5%",
                "status": "⚠️ EXEMPTED",
                "exemption_period": "2025 – 2026",
                "special_tax": 0,
                "note": "Cement is exempted from Special Tax from 2025 to end of 2026. Tax will apply starting 2027."
            }

    rate = rates[product_key]

    # Calculate tax base
    divisor = 1.0
    if includes_vat:
        divisor *= 1.1
    if includes_special_tax:
        divisor *= (1 + rate)

    tax_base = selling_price / divisor

    # Beer special rule: calculated on 90% of tax base
    is_beer = product_key == 'beer'
    effective_base = tax_base * 0.90 if is_beer else tax_base

    special_tax = effective_base * rate

    # Product display names
    display_names = {
        'wine': 'ស្រា (Wine/Liquor)',
        'beer': 'Beer 🍺',
        'cigarette': 'បារី (Cigarette)',
        'beverage': 'ភេសជ្ជៈ (Beverage)',
        'casino': 'កាស្បូ (Casino)',
        'cement': 'ស៊ីម៉ង់ត៍ (Cement)',
    }

    result = {
        "product": display_names[product_key],
        "selling_price": round(selling_price, 2),
        "includes_vat": includes_vat,
        "includes_special_tax": includes_special_tax,
        "tax_base": round(tax_base, 2),
        "rate": f"{int(rate * 100)}%",
        "special_tax": round(special_tax, 2),
        "status": "✅ Taxable"
    }

    # Add beer note
    if is_beer:
        result["beer_rule"] = "Beer calculated on 90% of tax base"
        result["effective_base_90pct"] = round(effective_base, 2)

    return result