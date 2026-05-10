"""
Cambodia Tax Calculator - Flask Backend
ITC Economy for Engineer Course
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from calculators.salary_calc import calculate_salary_tax
from calculators.prepayment_calc import (
    calculate_prepayment_tax,
    calculate_penalty,
    calculate_patent_tax,
    calculate_public_lighting_tax,
    calculate_special_tax
)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


# ─────────────────────────────────────────
# HEALTH CHECK
# ─────────────────────────────────────────

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "Cambodia Tax API is running"})


# ─────────────────────────────────────────
# TAX 01 — GENERAL TAX REFERENCE DATA
# ─────────────────────────────────────────

@app.route('/api/tax-info', methods=['GET'])
def tax_info():
    return jsonify({
        "taxpayer_categories": [
            {"type": "Small", "revenue_range": "250M - 700M KHR/year", "employees": "10 - 50", "accounting": "Simplified accounting"},
            {"type": "Medium", "revenue_range": "700M - 4,000M KHR/year", "employees": "51 - 100", "accounting": "Standard accounting (NCAR)"},
            {"type": "Large", "revenue_range": "> 4,000M KHR/year", "employees": "> 100", "accounting": "Standard accounting (NCAR)"}
        ],
        "filing_deadlines": {
            "monthly": "20th of following month",
            "annual_patent": "March 31 each year",
            "annual_profit": "March 31 of following year",
        },
        "penalties": {
            "minor_offense_fine": 2_000_000,
            "late_underpayment_lt10pct": "10% penalty + 1.5%/month interest",
            "late_underpayment_gte10pct": "25% penalty + 1.5%/month interest",
            "unilateral_assessment": "40% penalty + 1.5%/month interest",
            "complaint_deadline": "30 days from decision",
            "complaint_resolution": "60 days from filing"
        },
        "national_taxes": [
            "ពន្ធលើប្រាក់ចំណូល (Tax on Profit)",
            "ពន្ធលើប្រាក់បៀវត្ស (Tax on Salary)",
            "អាករលើតម្លៃបន្ថែម (VAT)",
            "អាករពិសេស (Specific Tax)",
            "ពន្ធអប្បបរមា (Minimum Tax)",
            "ពន្ធកាត់ទុក (Withholding Tax)",
            "ពន្ធលើឈ្នួលផ្ទះនិងដី (Tax on Rent)"
        ],
        "sub_national_taxes": [
            "អាករសម្រាប់បំភ្លឺសាធារណៈ",
            "អាករលើការស្នាក់នៅ",
            "ពន្ធលើមធ្យោបាយដឹកជញ្ជូន",
            "ពន្ធប៉ាតង់",
            "ពន្ធអប្បបរមា",
            "ពន្ធលើដីឡូតិ៍",
            "ពន្ធលើអចលនទ្រព្យ"
        ]
    })


# ─────────────────────────────────────────
# TAX 02 — SALARY TAX
# ─────────────────────────────────────────

@app.route('/api/salary-tax', methods=['POST'])
def salary_tax():
    try:
        data = request.get_json()
        salary = float(data.get('salary', 0))
        dependents = int(data.get('dependents', 0))
        is_resident = bool(data.get('is_resident', True))
        fringe_benefits = float(data.get('fringe_benefits', 0))
        loan_advance = float(data.get('loan_advance', 0))

        if salary < 0:
            return jsonify({"error": "Salary cannot be negative"}), 400

        result = calculate_salary_tax(
            salary=salary,
            dependents=dependents,
            is_resident=is_resident,
            fringe_benefits=fringe_benefits,
            loan_advance=loan_advance
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# TAX 03 — PREPAYMENT TAX ON PROFIT
# ─────────────────────────────────────────

@app.route('/api/prepayment-tax', methods=['POST'])
def prepayment_tax():
    try:
        data = request.get_json()
        monthly_revenue = float(data.get('monthly_revenue', 0))
        includes_vat = bool(data.get('includes_vat', True))

        if monthly_revenue < 0:
            return jsonify({"error": "Revenue cannot be negative"}), 400

        result = calculate_prepayment_tax(
            monthly_revenue=monthly_revenue,
            includes_vat=includes_vat
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# PENALTY CALCULATOR
# ─────────────────────────────────────────

@app.route('/api/penalty', methods=['POST'])
def penalty():
    try:
        data = request.get_json()
        tax_due = float(data.get('tax_due', 0))
        tax_paid = float(data.get('tax_paid', 0))
        months_overdue = int(data.get('months_overdue', 0))
        has_accounting = bool(data.get('has_accounting_records', True))

        result = calculate_penalty(
            tax_due=tax_due,
            tax_paid=tax_paid,
            months_overdue=months_overdue,
            has_accounting_records=has_accounting
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# PATENT TAX
# ─────────────────────────────────────────

@app.route('/api/patent-tax', methods=['POST'])
def patent_tax():
    try:
        data = request.get_json()
        taxpayer_size = data.get('taxpayer_size', 'small')
        years_unpaid = int(data.get('years_unpaid', 1))
        months_overdue = int(data.get('months_overdue', 0))

        result = calculate_patent_tax(
            taxpayer_size=taxpayer_size,
            years_unpaid=years_unpaid,
            months_overdue=months_overdue
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# PUBLIC LIGHTING TAX
# ─────────────────────────────────────────

@app.route('/api/lighting-tax', methods=['POST'])
def lighting_tax():
    try:
        data = request.get_json()
        product = data.get('product', 'beer')
        revenue = float(data.get('revenue', 0))
        includes_vat = bool(data.get('includes_vat', True))
        includes_lighting = bool(data.get('includes_lighting', True))

        if revenue <= 0:
            return jsonify({"error": "Revenue must be greater than 0"}), 400

        result = calculate_public_lighting_tax(
            product=product,
            revenue=revenue,
            includes_vat=includes_vat,
            includes_lighting=includes_lighting
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# SPECIAL TAX · អាករពិសេស
# ─────────────────────────────────────────

@app.route('/api/special-tax', methods=['POST'])
def special_tax():
    try:
        data = request.get_json()
        product = data.get('product', '')
        selling_price = float(data.get('selling_price', 0))
        includes_vat = bool(data.get('includes_vat', True))
        includes_special_tax = bool(data.get('includes_special_tax', True))

        if not product:
            return jsonify({"error": "Please select a product"}), 400
        if selling_price <= 0:
            return jsonify({"error": "Selling price must be greater than 0"}), 400

        result = calculate_special_tax(
            product=product,
            selling_price=selling_price,
            includes_vat=includes_vat,
            includes_special_tax=includes_special_tax
        )
        return jsonify(result)

    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────
# RUN SERVER ← ALWAYS AT THE VERY BOTTOM
# ─────────────────────────────────────────

if __name__ == '__main__':
    app.run(debug=True, port=5000)